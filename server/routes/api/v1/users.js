var express = require('express');
var router = express.Router();
var db = require('../../../lib/users');
var validate = require('../../../lib/user_validation');
var createUser = require('../../../lib/create_user');
var createAdmin = require('../../../lib/create_admin');
var auth = require('../../../middleware/auth/index');
var multiline = require('multiline');
var _ = require('lodash');
var bookshelf = require('../../../config/connection').surveys;

var usersApi = function(passport) {

  router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err || !user) return res.status(401).json( {error: "Invalid login"} );
      req.login(user, function(err) {
        if (err) return next(err);
        return res.json({id: user.id,
                         admin: user.admin === true ? true : false,
                         username: user.username, completed_demographics: user.completed_demographics}
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
  });

  router.post('/result', auth.ensureLoggedIn, function (req, res, next) {
    var query = multiline.stripIndent(function(){/*
      select * from scores where completion_id =
        (select c.id
        from completions c
        inner join surveys s on s.id = c.survey_id
        where c.user_id=? and s.name != 'Demographics' and s.name != 'Feedback'
        order by id desc limit 1);
    */});

    bookshelf.knex.raw(query, [req.session.passport.user]).then(function(data1){
      var query = multiline.stripIndent(function(){/*
        select * from scores where completion_id in
          (select c.id from completions c);
      */});

      bookshelf.knex.raw(query, [11 /*data1.rows[0].id*/]).then(function(data2){
        res.json({user: data1.rows[0], all: data2});
      });
    });
  });

  return router;
};

module.exports = usersApi;
