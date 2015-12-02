var express = require('express');
var router = express.Router();
var SurveyItem = require('../../../models/survey_item');
var Survey = require('../../../models/survey');

router.get('/', function (req, res, next) {
  SurveyItem.fetchAll().then(function (surveyItems) {
    res.json(surveyItems)
  })
})

router.get('/:id', function (req, res, next) {
  Survey.where({id: req.params.id}).fetch({withRelated: ['surveyItems']}).then(function (response) {
    res.json(response.related('surveyItems'));
  })
})

module.exports = router;
