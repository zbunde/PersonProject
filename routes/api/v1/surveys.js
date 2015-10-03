var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');

router.post('/', function (req, res, next) {
  new Survey(req.body).save().then(function (response) {

  })
})

module.exports = router;
