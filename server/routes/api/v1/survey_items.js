var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var _ = require('lodash');
var Survey = require('../../../models/survey');
var Version = require('../../../models/version');
var Question = require('../../../models/question');
var Field = require('../../../models/field');
var Completion = require('../../../models/completion');
var Answer = require('../../../models/answer');

var bookshelf = require('../../../config/connection').surveys;

router.post('/', function(req, res){
  var key = Object.keys(req.body.questions)[0];
  var survey_id =  req.body.questions[key].question.survey_id;
  var version_id = req.body.questions[key].question.version_id;

  new Completion({survey_id: survey_id, version_id, version_id}).save()
  .then(function(model){
    return Promise.all(_.map(req.body.answers, function(value, key){
      return new Answer({completion_id: model.id, question_id: key, value: value}).save();
    }));
  }).then(function(model){
    res.json({valid: true});
  });
});

router.get('/:id', function (req, res){
  bookshelf.knex.raw("select qv.version_id, q.id as qid, q.group as qgroup, q.position as qposition, q.text as qtext, q.dependent_id as qdependendid, f.id as fid, f.value as fvalue, f.position as fposition, f.text as ftext, f.widget as fwidget, f.metadata as fmetadata, fq.* from fields f inner join fields_questions fq on f.id = fq.field_id inner join questions q on q.id = fq.question_id inner join questions_versions qv on qv.question_id = q.id where fq.question_id in (select q.id from questions q inner join questions_versions qv on q.id = qv.question_id and qv.version_id = (select version from versions where survey_id = ? order by version desc limit 1))", req.params.id).then(function(data){
    var obj = {};
    data.rows.forEach(function(r){
      if(!obj[r.qid]){
        obj[r.qid] = {};
        obj[r.qid].question = {};
        obj[r.qid].fields = [];

        obj[r.qid].question.survey_id = req.params.id * 1;
        obj[r.qid].question.version_id = r.version_id;
        obj[r.qid].question.question_id = r.qid;
        obj[r.qid].question.text = r.qtext;
        obj[r.qid].question.position = r.qposition;
        obj[r.qid].question.group = r.qgroup;
        obj[r.qid].question.dependent_id = r.qdependendid;
      }

      obj[r.qid].fields.push({field_id: r.fid, value: r.fvalue, position: r.fposition, text: r.ftext, widget: r.fwidget, metadata: r.fmetadata});
    });

    res.json(obj);
  });
});

module.exports = router;
