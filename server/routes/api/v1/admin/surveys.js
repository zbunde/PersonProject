var express = require('express');
var router = express.Router();
var multiline = require('multiline');
var auth = require('../../../../middleware/auth/index');
var bookshelf = require('../../../../config/connection').surveys;
var json2csv = require('json2csv');
var _ = require('lodash');

function getQueryParamAsArray(req, param, options) {
  var vals = [];
  if (options && options.number && _.isArray(req.query[param])) {
    req.query[param].forEach(function(key) {
      if (_.isFinite(Number(key))) {
        vals.push(Number(key));
      }
    });
  } else if (_.isArray(req.query[param])) {
    vals = req.query[param];
  } else if (options && options.number && _.isFinite(Number(req.query[param]))) {
    vals.push(Number(req.query[param]));
  } else {
    vals = [req.query[param]];
  }

  return vals;
}
router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  bookshelf.knex.select("surveys.id", "surveys.name")
                .count("*")
                .from("surveys")
                .innerJoin("completions", "surveys.id", "completions.survey_id")
                .groupBy("surveys.id")
                .then(function(data){
    return data;
  }).then(function(data) {
    bookshelf.knex.select("surveys.id", "surveys.name")
                  .from("surveys")
                  .leftOuterJoin("completions", "surveys.id", "completions.survey_id")
                  .where("completions.id", null)
                  .then(function(dataNoCompletions) {
      dataNoCompletions = dataNoCompletions.map(function(r) {
        r.count = 0;
        return r;
      });

      return res.json({surveys: data.concat(dataNoCompletions)});
    });
  });
});

router.get('/items', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  var ids = [], obj = {surveys: []}, dataStorage = {}, query;
  ids = getQueryParamAsArray(req, 'id', {number: true});

  bookshelf.knex.select("surveys.id", "surveys.name", "questions.text", "questions.id as question_id")
                .from("surveys")
                .innerJoin("questions", "surveys.id", "questions.survey_id")
                .whereIn("surveys.id", ids)
                .then(function(data){
    data.forEach(function(r) {

      dataStorage[r.id] = dataStorage[r.id] || {};
      dataStorage[r.id].name = r.name;
      dataStorage[r.id].questions = dataStorage[r.id].questions || [];
      dataStorage[r.id].questions.push({text: r.text, id: r.question_id});
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

// Example query string:
// sid=7&q2=demo-q5&q7=lone-q19&q7=lone-q17&q7=lone-q16&q7=lone-q13&q7=lone-q12
router.get('/csv', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  var ids = getQueryParamAsArray(req, 'sid', {number: true}), obj = {}, qids;

  qids = _.flatten(ids.map(function(id) {
    return getQueryParamAsArray(req, 'q' + id);
  }));

  console.log(ids, qids, req.query);
  bookshelf.knex.select("completions.id as cid", "completions.user_id", "answers.value", "questions.text", "questions.id as qid", "completions.survey_id")
                .from("completions")
                .innerJoin("answers","completions.id","answers.completion_id")
                .innerJoin("questions", "questions.id", "answers.question_id")
                .whereIn("completions.survey_id", ids)
                .whereIn("questions.id", qids)
                .where("completions.version_id", 1)
                .then(function(data) {

    data.forEach(function(r) {
      obj[r.user_id] = obj[r.user_id] || {};
      obj[r.user_id].user_id = r.user_id;
      obj[r.user_id][r.text] = r.value;
    });

    var objs = _.map(obj, function(value, key){
      return value;
    });

    var fs = require('fs');
    json2csv({data: objs, del: '\t', quotes: ''}, function(err, csv){
      fs.writeFile('file.csv', csv, function(err) {
        res.download('file.csv');
      });
    });
  });
});

module.exports = router;