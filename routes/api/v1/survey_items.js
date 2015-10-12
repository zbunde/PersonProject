var express = require('express');
var router = express.Router();
var models = require('../../../models/survey');
var SurveyItem = models.SurveyItem;

router.get('/', function (req, res, next) {
  res.json("works")
})

router.post('/', function (req, res, next) {

})

router.get('/:id', function (req, res, next) {

})

module.exports = router;


// TO Do

// get all surveyItems and render json
// create a surveyItems seed file

// wire up Surveys using Sequelize
// create a Surveys seed file

// push new database to heroku
