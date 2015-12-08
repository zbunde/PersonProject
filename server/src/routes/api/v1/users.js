var express = require('express');
var router = express.Router();
var db = require('../../../lib/users');
var validate = require('../../../lib/user_validation');
var createUser = require('../../../lib/create_user');
var createAdmin = require('../../../lib/create_admin');
var auth = require('../../../middleware/auth/index');

var usersApi = function(passport) {

  router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err || !user) return res.status(401).json( {error: "Invalid login"} );
      req.login(user, function(err) {
        if (err) return next(err);
        return res.json({id: user.id,
                         admin: user.admin === true ? true : false,
                         username: user.username}
          );
      });
    })(req, res, next);
  });

  // TODO: Add a create admin user api that verifies that
  // the user who is creating an admin is an admin

  router.post('/', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err || !user) return res.status(401).json( {error: "Invalid login"} );
      req.login(user, function(err) {
        if (err) return next(err);
        return res.json({id: user.id,
                         admin: user.admin === true ? true : false,
                         username: user.username}
        );
      });
    })(req, res, next);
  });

  router.get('/me', auth.ensureLoggedIn, function(req, res, next) {
    return res.json(req.user);
  });

  router.delete('/session', auth.ensureLoggedIn, function(req, res, next) {
    req.logout();
    return res.json({success: "Logged out"});
  });

  router.delete('/me', auth.ensureLoggedIn, function (req, res, next) {
    db.remove(req.params.id).then(function (response) {
      res.json(response)
    })
  })

  return router;
};

module.exports = usersApi;
