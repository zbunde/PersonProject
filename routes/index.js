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

router.get('/account', ensureAuthenticated, function(req, res){
res.render('account', { user: req.user });
});

router.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
});

router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
 res.redirect('/users');
});

router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});

// test authentication
function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}


module.exports = router;
