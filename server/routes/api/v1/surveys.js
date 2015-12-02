var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');

router.get('/', function (req, res, next) {
  Survey.fetchAll().then(function (surveys) {
    res.json(surveys)
  })
})

router.post('/', function (req, res, next) {
  new Survey(req.body).save().then(function (response) {
    res.json(response);
  })
})

router.get('/:id', function (req, res, next) {
  return new Survey({ id: req.params.id }).fetch().then(function (response) {
    res.json(response.attributes);
  })
})

module.exports = router;
