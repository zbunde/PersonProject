var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');
var createUser = require('../lib/create_user');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('users/index', { user: app.locals.user });
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.post('/signup', function(req, res, next) {
  var errors = validUser.errors(req.body);
  if(errors.length){
    res.render('users/signup', { errors: errors })
  } else {
    validUser.userExists(req.body, function (result) {
      if(result){
        res.render('users/signup', { errors: ["Username already exists"] })
      } else {
        createUser(req.body, function (data) {
          req.flash("success", "Account successfully created. Login to continue.")
          res.redirect('/users/signin');
        });
      }
    });
  }
});

router.get('/signin', function(req, res, next) {
  var info = req.flash('success');
  res.render('users/signin', { info: info });
});

router.get('/logout', function(req, res, next) {
  app.locals.user = null
  res.redirect('/');
});

router.post('/signin', function(req, res, next) {
  validUser.userExists(req.body, function(record) {
    if(!record) {
      res.render('users/signin', { errors: "Username does not exist"});
    } else if(record && validUser.checkPassword(req.body, record)){
      app.locals.user = record.attributes.username;
      res.redirect('/users');
    } else {
      res.render('users/signin', { errors: "Password is incorrect" })
    }
  });
});

module.exports = router;
