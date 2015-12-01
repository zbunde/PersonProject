var dbConfig = require('../../config/connection')
var knex = require('knex')
var app = require('../../app')
var request = require('supertest')(app)
var User = require('../../models/user')
var createUser = require('../../lib/create_user');

function truncateAll(knex) {
  var sql = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"
  return dbConfig.users.knex.raw(sql).then(function (response) {
    var tableNames = response.rows.map(function(row){ return row.tablename })
    return dbConfig.users.knex.raw('TRUNCATE ' + tableNames.join() + ' CASCADE');
  })
}

describe("/api/v1/users", function () {

  var authSessionRegex = new RegExp('^person.session=.*; path=/;.*httponly.*');
  var successfulLoginKeyWhitelist = {id: true, admin:true, username: true};

  beforeEach(function () {
    return Promise.all([
      truncateAll(dbConfig.users.knex),
      truncateAll(dbConfig.surveys.knex)
    ])
  })
  describe("Authenticated requests", function() {
    var authCookies;
    beforeEach(function(done) {
      request.post('/api/v1/users')
        .send({username: 't@testing.com', password: 'password123'})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          authCookies = res.headers['set-cookie'].map(function(cookie) {
            return cookie.split(';')[0];
          }).join(';');
          done();
        });
    });

    describe("GET /", function () {

      it("shows logged in user's info", function (done) {
        request.get('/api/v1/users/me')
          .set('Cookie', authCookies)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });

      it("fails without authentication credentials", function(done) {
        request.get('/api/v1/users/me')
          .expect(401)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          })
      });

      it("fails without signature cookie", function(done) {
        var cookie = authCookies.split(';')[0] + ';'
        request.get('/api/v1/users/me')
          .set('Cookie', cookie)
          .expect(401)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          })
      });
    });

    describe("DELETE /session", function() {
      it("does not allow an unauthenticated user to delete a session", function(done) {
        request.delete('/api/v1/users/session')
          .expect(401)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });

      it("deletes the session of an authenticated user", function(done) {
        request.delete('/api/v1/users/session')
          .set('Cookie', authCookies)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });

      it("a new non authenticated session is set after logout", function(done) {
        request.delete('/api/v1/users/session')
          .set('Cookie', authCookies)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.headers['set-cookie']).to.exist;
            var newSessionCookies = res.headers['set-cookie'].map(function(cookie) {
              return cookie.split(';')[0];
            }).join(';');
            request.delete('/api/v1/users/session')
              .set('Cookie', newSessionCookies )
              .expect(401)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              })
          });
      });
    });
  });

  describe("POST /", function() {
    var userData = {username: 'testing@testing.com', password: 'password'};

    it("creates a user if the username has not been taken", function(done) {
      request.post('/api/v1/users')
        .send(userData)
        .expect(200)
        .expect('Set-Cookie', authSessionRegex)
        .end(function(err, res) {
          if (err) return done(err);

          new User({username: 'testing@testing.com'}).fetch().then(function(user) {
            expect(user).to.exist;
            expect(user.get('username')).to.exist;
            expect(user.get('username')).to.equal(userData.username);
            expect(user.get('hashed_pass')).to.exist;
            expect(user.get('hashed_pass')) .to.not.equal('password');
            expect(user.get('admin')).to.exist;
            expect(user.get('admin')).to.be.a('boolean');
            expect(user.get('admin')).to.be.false;
            done();
          }).catch(function(error) {
            throw error;
          });
      });
    });

    it("returns only whitelisted keys after creating a user", function(done) {
      request.post('/api/v1/users')
        .send(userData)
        .expect(200)
        .expect('Set-Cookie', authSessionRegex)
        .end(function(err, res) {
          if (err) return done(err);
          for (key in res.body) {
            expect(successfulLoginKeyWhitelist[key]).to.exist;
          }
          expect(res.body.admin).to.exist;
          expect(res.body.admin).to.be.a('boolean');
          expect(res.body.admin).to.be.false;

          expect(res.body.username).to.exist;
          expect(res.body.username).to.equal(userData.username);
          done();
      });
    });


    it("fails to create a user if that username is already in use", function(done) {
      new User({username: userData.username, hashed_pass: 'fakehashedpass'}).save()
        .then(function(user) {
          expect(user.get('username')).to.exist;
          expect(user.get('username')).to.equal(userData.username);

          request.post('/api/v1/users')
            .send(userData)
            .expect(401)
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
      }).catch(function(error) {
        throw error;
      });
    });

    it("does not allow an unauthorizaed user to create admins", function(done) {
      var userAdminData = {username: 'testing@testing.com', password: 'password', admin: 'true'};

      request.post('/api/v1/users')
        .send(userAdminData)
        .expect(200)
        .expect('Set-Cookie', authSessionRegex)
        .end(function(err, res) {
          if (err) return done(err);
          new User({username: 'testing@testing.com'}).fetch().then(function(user) {
            expect(user).to.exist;
            expect(user.get('username')).to.exist;
            expect(user.get('username')).to.equal('testing@testing.com');
            expect(user.get('hashed_pass')).to.exist;
            expect(user.get('hashed_pass')) .to.not.equal('password');
            expect(user.get('admin')).to.exist;
            expect(user.get('admin')).to.be.a('boolean');
            expect(user.get('admin')).to.false;
            done();
          }).catch(function(error) {
            throw error;
          });
        });
    });
  });

  describe("/signin", function() {
    var userData = {username: 'testing@testing.com', password: 'password'};
    beforeEach(function () {
      return createUser(userData.username, userData.password);
    });

    it("authenticates an existing user", function(done) {
      request.post('/api/v1/users/signin')
        .send(userData)
        .expect(200)
        .expect('Set-Cookie', authSessionRegex)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it("only returns whitelisted keys after login", function(done) {
      request.post('/api/v1/users/signin')
        .send(userData)
        .expect(200)
        .expect('Set-Cookie', authSessionRegex)
        .end(function(err, res) {
          if (err) return done(err);
          for (key in res.body) {
            expect(successfulLoginKeyWhitelist[key]).to.exist;
          }

          expect(res.body.admin).to.exist;
          expect(res.body.admin).to.be.a('boolean');
          expect(res.body.admin).to.be.false;

          expect(res.body.username).to.exist;
          expect(res.body.username).to.equal(userData.username);
          done();
        });
    });

    it("does not authenticate a user who is not in the database", function(done) {
      request.post('/api/v1/users/signin')
        .send({username: 't@t.com', password: 'p1234567'})
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        })
    });

    it("does not authenticate a user who is in the database but has the wrong password", function(done) {
      request.post('/api/v1/users/signin')
        .send({username: userData.username, password: 'Password'})
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        })
    });
  });
});
