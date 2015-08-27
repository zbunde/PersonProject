var express = require('express');
var router = express.Router();
var db = require('../lib/users');

router.get('/users', function (req, res, next) {
  db.getUsers().then(function(users) {
    res.json(users);
  })
});

router.post('/signup', function (req, res, next) {
  res.redirect('/');
})


module.exports = router;
