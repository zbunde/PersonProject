var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');
var createUser = require('../lib/create_user');
var getAllUsers = require('../lib/users');

/* GET users listing. */

router.get('/', ensureAuthenticated, function(req, res, next) {
  if(req.session.isAdmin) {
    getAllUsers(function (users) {
      res.render('users/index', { users: users });
    });
  } else {
    res.render('users/show', { error: req.flash('error') });
  }
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.post('/signup', function(req, res, next) {
  var errors = validUser.errors(req.body);
  if(errors.length){
    res.render('users/signup', { errors: errors })
  } else {
    validUser.userExists(req.body.username, function (result) {
      if(result){
        res.render('users/signup', { errors: ["Username already exists"] })
      } else {
        createUser(req.body.username, req.body.password, function (data) {
          req.flash("success", "Account successfully created. Login to continue.")
          res.redirect('/users/signin');
        });
      }
    });
  }
});

router.get('/signin', function(req, res, next) {
  res.render('users/signin', { success: req.flash('success'), error: req.flash('error') });
});

router.post('/signin', function(req, res, next) {
  validUser.userExists(req.body.username, function(record) {
    if(!record) {
      res.render('users/signin', { errors: "Username does not exist"});
    } else if(record && validUser.checkPassword(req.body, record)){
      req.session.isAdmin = record.attributes.admin;
      req.session.currentUser = record.attributes.username;
      req.session.sess_id = record.attributes.id;
        if(req.session.isAdmin) {
          res.redirect('/admin')
        } else { res.redirect('/users')};
    } else {
      res.render('users/signin', { errors: "Password is incorrect" })
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session.sess_id = null;
  req.session.currentUser = null;
  res.redirect('/');
});
// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  if (req.session.currentUser) { return next(); }
  req.flash('error');
  req.flash("error", "You must be logged in to do that.")
  res.redirect('/users/signin');
}

module.exports = router;
