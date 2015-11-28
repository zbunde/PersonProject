var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var createUser = require('../lib/create_user');
var validate = require('../lib/user_validation');

// expose this function to our app using module.exports
module.exports = function(passport) {
  function userToJSON(user) {
    return {
      id: user.attributes.id,
      username: user.attributes.username,
      admin: user.attributes.admin,
    }
  }
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    new User({id: id}).fetch().then(function(user) {
      if (user) {
        done(null, userToJSON(user));
      } else {
        done(null, false);
      }
    }).catch(function(err) {
      done(err, null);
    })
  });

  // Local signup.  Used for creating a user, no
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  },
    function(req, username, password, done) {
      validate.userExists(username).then(function(results) {
        if (results) {
          return done(null, false, {error: 'Incorrect username or password'});
        } else {
          createUser(username, password).then(function (user) {
            return done(null, user.attributes, {success: "Logging in"});
          }).catch(function(error) {
            return done(error);
          })
        }
      }).catch(function(error) {
        return done(error);
      });
    }
  ));

  passport.use('local-signin', new LocalStrategy({
    passReqToCallback : true
  },
    function(req, username, password, done) {
      validate.userExists(username).then(function(user) {
        if (user && validate.checkPassword(password, user.attributes)) {
          return done(null, user.attributes, {success: "Logged in"});           
        } else {
          return done(null, false, {error: 'Incorrect username or password'});
        }
      }).catch(function(error) {
        return done(error);
      });
    }
  ));
};