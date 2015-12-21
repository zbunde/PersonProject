var express = require('express');
var router = express.Router();
var multiline = require('multiline');
var auth = require('../../../../middleware/auth/index');
var bookshelf = require('../../../../config/connection').surveys;
var _ = require('lodash');

router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  bookshelf.knex.select("surveys.id", "surveys.name")
                .count("*")
                .from("surveys")
                .innerJoin("completions", "surveys.id", "completions.survey_id")
                .groupBy("surveys.id")
                .then(function(data){
    return res.json({surveys: data});
  });
});

router.get('/items', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  var ids = [], obj = {surveys: []}, dataStorage = {}, query;
  if (_.isArray(req.query.id)) {
    req.query.id.forEach(function(id) {
      if (_.isFinite(Number(id))) {
        ids.push(Number(id));
      }
    })
  } else {
    if (_.isFinite(Number(req.query.id))) { ids.push(Number(req.query.id)); }
  }

  bookshelf.knex.select("surveys.id", "surveys.name", "questions.text")
                .from("surveys")
                .innerJoin("questions", "surveys.id", "questions.survey_id")
                .whereIn("surveys.id", ids)
                .then(function(data){
    data.forEach(function(r) {

      dataStorage[r.id] = dataStorage[r.id] || {};
      dataStorage[r.id].name = r.name;
      dataStorage[r.id].questions = dataStorage[r.id].questions || [];
      dataStorage[r.id].questions.push(r.text);
    })

    obj.surveys = Object.keys(dataStorage).map(function(key) {
      return {id: key,
              name: dataStorage[key].name,
              questions: dataStorage[key].questions
             };
    });

    return res.json(obj);
  });
});

module.exports = router;