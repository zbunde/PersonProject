var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('users/index', { user: req.cookies.username });
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.get('/signin', function(req, res, next) {
  res.render('users/signin');
});

router.post('/signin', function(req, res, next) {
  if(validUser(req.body)){
    res.cookie("username", "user@example.com");
    res.redirect('/users');
  } else {
    res.render("users/signin", { errors: "Invalid username/password" })
  };
});

module.exports = router;
