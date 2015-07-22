var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('users/index', { user: app.locals.user });
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.get('/signin', function(req, res, next) {
  res.render('users/signin');
});

router.get('/logout', function(req, res, next) {
  app.locals.user = null
  res.redirect('/');
});

router.post('/signin', function(req, res, next) {
  if(validUser(req.body)){
    app.locals.user = req.body.username;
    res.redirect('/users');
  } else {
    res.render("users/signin", { errors: "Invalid username/password" })
  };
});

module.exports = router;
