var express = require('express');
var router = express.Router();
var db = require('../../../lib/users');
var validate = require('../../../lib/user_validation');
var createUser = require('../../../lib/create_user');
var createAdmin = require('../../../lib/create_admin');
var auth = require('../../../middleware/auth/index');
var multiline = require('multiline');
var _ = require('lodash');
var surveysDb = require('../../../config/connection').surveys;
var usersDb = require('../../../config/connection').users;

var usersApi = function(passport) {

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  router.post('/migrate', function(req, res){
    var query1 = multiline.stripIndent(function(){/*
      update completions set user_id = ? where user_id = ?
    */});

    var query2 = multiline.stripIndent(function(){/*
      select 1 as present
      from surveys s
      inner join completions c on c.survey_id = s.id
      where s.name = 'Demographics' and c.user_id = ?
      limit 1
    */});

    var query3 = multiline.stripIndent(function(){/*
      update users set completed_demographics = true where id = ?
    */});

    surveysDb.knex.raw(query1, [req.session.passport.user, req.body.userToken]).then(function(data1){
      surveysDb.knex.raw(query2, [req.session.passport.user]).then(function(data2){
        if(data2.rowCount === 1){
          usersDb.knex.raw(query3, [req.session.passport.user]).then(function(data3){
            res.json({demographics: true});
          });
        }else{
          res.json({demographics: false});
        }
      });
    });
  });

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  router.get('/completed-surveys', function(req, res){
    var query = multiline.stripIndent(function(){/*
      select sur.name, c.id, c.recorded_time, c.created_at, s.value
      from completions c
      inner join scores s on c.id = s.completion_id
      inner join surveys sur on sur.id = c.survey_id
      where c.user_id = ?
    */});

    surveysDb.knex.raw(query, [req.session.passport.user]).then(function(data){
      res.json({rows: data.rows});
    });
  });

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  // TODO: Add a create admin user api that verifies that
  // the user who is creating an admin is an admin

  router.post('/', function(req, res, next) {

    console.log('****body****', req.body);

    passport.authenticate('local-signup', function(err, user, info) {

      console.log('****user****', user);


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

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  router.get('/me', auth.ensureLoggedIn, function(req, res, next) {
    return res.json(req.user);
  });

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  router.delete('/session', auth.ensureLoggedIn, function(req, res, next) {
    req.logout();
    return res.json({success: "Logged out"});
  });

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  router.delete('/me', auth.ensureLoggedIn, function (req, res, next) {
    db.remove(req.params.id).then(function (response) {
      res.json(response)
    })
  });

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  router.post('/result', function (req, res, next) {
    var query1 = multiline.stripIndent(function(){/*
      select su.name, s.*
      from scores s
      inner join completions c on c.id = s.completion_id
      inner join surveys su on su.id = c.survey_id
      where s.completion_id =
        (select c.id
        from completions c
        inner join surveys s on s.id = c.survey_id
        where c.user_id=? and s.name != 'Demographics' and s.name != 'Feedback'
        order by id desc limit 1);
    */});

    var query2 = multiline.stripIndent(function(){/*
      select su.name, s.*
      from scores s
      inner join completions c on c.id = s.completion_id
      inner join surveys su on su.id = c.survey_id
      where c.user_id = ? and s.completion_id = ?
    */});

    if(req.body.completion_id){
      var query = query2;
      var params = [req.session.passport.user || req.body.userToken, req.body.completion_id];
    }else{
      var query = query1;
      var params = [req.session.passport.user || req.body.userToken];
    }

    surveysDb.knex.raw(query, params).then(function(data1){
      var query = multiline.stripIndent(function(){/*
        select s.*
        from scores s
        inner join completions c on c.id = s.completion_id
        where c.survey_id =
          (select su.id from surveys su inner join completions c on su.id = c.survey_id where c.id = ?)
      */});

      if(!data1.rows.length){
        return res.json({survey: "Not Implemented", score: 0, average: 0});
      }

      surveysDb.knex.raw(query, [data1.rows[0].completion_id]).then(function(data2){
        var sum = _.reduce(data2.rows, function(acc, row){
          return acc + row.value;
        }, 0);
        var avg = sum / data2.rows.length;
        res.json({survey: data1.rows[0].name, score: data1.rows[0].value, average: avg});
      });
    });
  });

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  return router;
};

module.exports = usersApi;
