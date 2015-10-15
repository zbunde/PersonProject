var express = require('express');
var router = express.Router();
var SurveyItem = require('../../../models/survey_item');

router.get('/', function (req, res, next) {
  SurveyItem.fetchAll().then(function (surveyItems) {
    res.json(surveyItems)
  })
})

router.get('/:id', function (req, res, next) {
  return new SurveyItem({ survey_id: req.params.id }).fetch().then(function (response) {
    res.json(response.attributes);
  })
})

module.exports = router;
