var express = require('express');
var router = express.Router();
var validUser = require('../lib/user_validation');
var createAdmin = require('../lib/create_admin');

router.get('/', ensureIsAdmin, function(req, res, next) {
  res.render('admin/index', { currentUser: req.session.currentUser });
});

router.get('/new', function(req, res, next) {
  res.render('admin/new');
})

router.post('/new', function (req, res, next) {
  var errors = validUser.errors(req.body);
  if(errors.length){
    res.render('admin/new', { errors: errors })
  } else {
    validUser.userExists(req.body.username, function (result) {
      if(result){
        res.render('admin/new', { errors: ["Username already exists"] })
      } else {
        createAdmin(req.body.username, req.body.password, function (data) {
          req.flash("success", "Account successfully created. Login to continue.")
          res.redirect('/users/signin');
        });
      }
    });
  }
});

function ensureIsAdmin(req, res, next) {
  if (req.session.isAdmin) { return next(); }
  if(req.session.currentUser){
    req.flash('error');
    req.flash('error', "Access denied")
    res.redirect('/users');
  }
    res.redirect('/users/signin');
}

module.exports = router;
