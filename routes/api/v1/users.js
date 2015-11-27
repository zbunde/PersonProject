var express = require('express');
var router = express.Router();
var db = require('../../../lib/users');
var validate = require('../../../lib/user_validation');
var createUser = require('../../../lib/create_user');
var createAdmin = require('../../../lib/create_admin');

var usersApi = function(passport) {
  function toJSON(user) {
    return {
      id: user.attributes.id,
      username: user.attributes.username,
      admin: user.attributes.admin,
    }
  }

  router.get('/', function (req, res, next) {
    db.getUsers().then(function(users) {
      res.json(users.models.map(toJSON));
    })
  });

  router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err || !user) return res.status(401).json( {error: "Invalid login"} );
      req.login(user, function(err) {
        if (err) return next(err);
        return res.json({success: "Logged in"});
      });
    })(req, res, next);
  });

  // TODO: Add a create admin user api that verifies that
  // the user who is a creating an admin is an admin

  router.post('/', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err || !user) return res.status(401).json( {error: "Invalid login"} );
      req.login(user, function(err) {
        if (err) return next(err);
        return res.json({success: "Logged in"});
      });
    })(req, res, next);
  });

  router.get('/:id', function(req, res, next) {
    db.getUser(req.params.id).then(function (user) {
      res.json(toJSON(user));
    })
  })

  router.delete('/:id', function (req, res, next) {
    db.remove(req.params.id).then(function (response) {
      res.json(response)
    })
  })

  return router;
};

module.exports = usersApi;
