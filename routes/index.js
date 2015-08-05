var express = require('express');
var router = express.Router();
var config = require('../oauth.js')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

// Facebook Oauth

router.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
});

router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
  app.locals.user = req.user.displayName;
  res.redirect('/users');
});

module.exports = router;
