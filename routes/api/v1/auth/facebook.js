var express = require('express');
var router = express.Router();
var db = require('../../../../lib/users');
var validate = require('../../../../lib/user_validation');
var createUser = require('../../../../lib/create_user');
var createAdmin = require('../../../../lib/create_admin');
var auth = require('../../../../middleware/auth/index');

var facebookApi = function(passport) {

  router.get('/', passport.authenticate('facebook', { scope : 'public_profile,email' }));

      // handle the callback after facebook has authenticated the user
  router.get('/callback',
          passport.authenticate('facebook', {
              successRedirect : '/api/v1/users/me',
              failureRedirect : '/api/v1/auth/facebook/failure'
          })
  );

  router.get('/failure', function(req, res, next) {
    res.status(401).json({error: "login error"});
  });

  return router;
};

module.exports = facebookApi;
