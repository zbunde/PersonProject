var express = require('express');
var router = express.Router();
var db = require('../lib/users');
var validate = require('../lib/user_validation');
var createUser = require('../lib/create_user');

router.get('/users', function (req, res, next) {
  db.getUsers().then(function(users) {
    res.json(users);
  })
});

router.post('/signup', function (req, res, next) {
  validate.userExists(req.body.username, function (result) {
    if(!result) {
      createUser(req.body.username, req.body.password).then(function (user) {
        res.json(user);
        })
    } else {
      res.json({error: true});
    }
  });
})

router.post('/signin', function (req, res, next) {
  validate.userExists(req.body.username, function (result) {
    if(!result) {
      res.json({error: "User does not exist"})
    } else if (validate.checkPassword(req.body.password, result.hashed_pass)) {
      res.json(result)
    } else {
      res.json({ error: "Passwords do not match"})
    }
  })
});



module.exports = router;
