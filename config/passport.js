var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var oauthConfig = require('../config/oauth');
var User = require('../models/user');
var createUser = require('../lib/create_user');
var createFBUser = require('../lib/create_facebook_user');
var validate = require('../lib/user_validation');


// expose this function to our app using module.exports
module.exports = function(passport) {
  function userToJSON(user) {
    return {
      id: user.attributes.id,
      username: user.attributes.username,
      admin: user.attributes.admin,
      facebook_user_info: user.attributes.facebook_user_info
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

  passport.use(new FacebookStrategy({
    clientID        : oauthConfig.facebook.clientID,
    clientSecret    : oauthConfig.facebook.clientSecret,
    callbackURL     : oauthConfig.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails']
  },
    function(token, refreshToken, profile, done) {
      if (token && profile.id) {
        new User({facebook_id: profile.id}).fetch().then(function(model) {
          if (model && model.get('facebook_id')) {
            done(null, userToJSON(model));
          } else {
            profile.name.displayName = profile.displayName;
            if (profile.emails && profile.emails.length > 0) {
              profile.name.email = profile.emails[0].value;
            }
            createFBUser(profile.id, token, profile.name).then(function(model) {
              done(null, userToJSON(model));
            }).catch(function(error) {
              console.log("Error: could not signin using facebook strategy", error);
              done(error);
            });
          }
        }).catch(function(error) {
          console.log("Error: could not signin using facebook strategy", error);
          done(error);
        });
      } else {
        done(null, false);
      }
    }
  ));
};
