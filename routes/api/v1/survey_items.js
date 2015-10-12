var express = require('express');
var router = express.Router();
var SurveyItem = require('../../../models/survey_item');

router.get('/', function (req, res, next) {
  SurveyItem.fetchAll().then(function (surveyItems) {
    res.json(surveyItems)
  })
})

module.exports = router;
