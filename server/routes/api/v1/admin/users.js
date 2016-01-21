var express = require('express');
var router = express.Router();
var createAdmin = require('../../../../lib/create_admin');
var auth = require('../../../../middleware/auth/index');

router.post('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res, next) {
  createAdmin(req.body.username, req.body.password).then(function(admin) {
    res.send({username: admin.attributes.username});
  }).catch(function(error) {
    res.status(500).send({error: "Could not create an admin"});
  });
});

module.exports = router;
