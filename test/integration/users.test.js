var dbConfig = require('../../config/connection')
var knex = require('knex')
var app = require('../../app')
var request = require('supertest')(app)
var User = require('../../models/user')

function truncateAll(knex) {
  var sql = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"
  return dbConfig.users.knex.raw(sql).then(function (response) {
    var tableNames = response.rows.map(function(row){ return row.tablename })
    return dbConfig.users.knex.raw('TRUNCATE ' + tableNames.join() + ' CASCADE');
  })
}

describe("/api/v1/users", function () {

  beforeEach(function () {
    return Promise.all([
      truncateAll(dbConfig.users.knex),
      truncateAll(dbConfig.surveys.knex)
    ])
  })

  describe("/", function () {
    it("shows users", function (done) {
      new User({username: 'cat', hashed_pass: 'pass'})
        .save()
        .then(function (user) {
          request.get('/api/v1/users')
            .expect(200)
            .end(function (err, res) {
              expect(res.body.length).to.equal(1)
              expect(res.body[0]).to.have.property('id')
              expect(res.body[0]).to.not.have.property('hashed_pass')
              expect(res.body[0].username).to.equal("cat")
              expect(res.body[0].admin).to.equal(false)
              done()
            })
        })
    })
  })
})
