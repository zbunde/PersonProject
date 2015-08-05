var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');
var createUser = require('../lib/create_user');
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

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
 });
}
));

module.exports = router;
