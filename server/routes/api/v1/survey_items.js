var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var multiline = require('multiline');
var _ = require('lodash');
var Survey = require('../../../models/survey');
var Version = require('../../../models/version');
var Question = require('../../../models/question');
var Field = require('../../../models/field');
var Completion = require('../../../models/completion');
var Answer = require('../../../models/answer');
var bookshelf = require('../../../config/connection').surveys;
var json2csv = require('json2csv');

router.post('/', function(req, res){
  var survey_id =  req.body.survey.survey_id;
  var version_id = req.body.survey.version_id;
  var user_id = req.session.passport.user;

  new Completion({survey_id: survey_id, version_id: version_id, user_id: user_id}).save()
  .then(function(model){
    return Promise.all(_.map(req.body.answers, function(value, key){
      return new Answer({completion_id: model.id, question_id: key, value: value}).save();
    }));
  }).then(function(model){
    res.json({valid: true});
  });
});

router.get('/:id', function (req, res){
  var query = multiline.stripIndent(function(){/*
    select q.id as qid, q.group_number as qgroup_number, q.group_type as qgroup_type,
      q.group_title as qgroup_title, q.group_description as qgroup_description, q.position as qposition,
      q.text as qtext, q.dependent_id as qdependendid, f.id as fid, f.value as fvalue, f.position as fposition,
      f.text as ftext, f.widget as fwidget, f.metadata as fmetadata, fq.*, qv.version_id
    from fields f
    inner join fields_questions fq on f.id = fq.field_id
    inner join questions q on q.id = fq.question_id
    inner join questions_versions qv on qv.question_id = q.id
    where fq.question_id in
      (select q.id
      from questions q
      inner join questions_versions qv on q.id = qv.question_id
      where q.survey_id = ? and qv.version_id =
        (select version from versions where survey_id = ? order by version desc limit 1))
    order by q.group_number asc
  */});

  bookshelf.knex.raw(query, [req.params.id, req.params.id]).then(function(data){
    var obj = {};
    var group;

    obj.survey_id = req.params.id;
    obj.version_id = data.rows[0].version_id;
    obj.groups = {};

    data.rows.forEach(function(r){
      if(!obj.groups[r.qgroup_number]){

        obj.groups[r.qgroup_number] = {};
        group = obj.groups[r.qgroup_number];

        group.number = r.qgroup_number;
        group.type = r.qgroup_type;
        group.title = r.qgroup_title;
        group.description = r.qgroup_description;
        group.questions = {};
      }

      if(!group.questions[r.qid]){
        group.questions[r.qid] = {};
        group.questions[r.qid].question = {};
        group.questions[r.qid].fields = [];

        group.questions[r.qid].question.question_id = r.qid;
        group.questions[r.qid].question.text = r.qtext;
        group.questions[r.qid].question.position = r.qposition;
        group.questions[r.qid].question.dependent_id = r.qdependendid;
      }

      group.questions[r.qid].fields.push({field_id: r.fid, value: r.fvalue, position: r.fposition, text: r.ftext, widget: r.fwidget, metadata: r.fmetadata});
    });

    res.json(obj);
  });
});

router.get('/:id/csv', function (req, res){
  var query = multiline.stripIndent(function(){/*
    select c.id, c.user_id, a.value, q.text
    from completions c
    inner join answers a on c.id = a.completion_id
    inner join questions q on q.id = a.question_id
    where c.survey_id = 4 and c.version_id = 1;
  */});

  bookshelf.knex.raw(query).then(function(data){
    var obj = {};

    data.rows.forEach(function(r){
      obj[r.id] = obj[r.id] || {};
      obj[r.id].completion = r.id;
      obj[r.id].user_id = r.user_id;
      obj[r.id][r.text] = r.value;
    });

    var objs = _.map(obj, function(value, key){
      return value;
    });

    var fs = require('fs');
    var fields = ['user', 'question', 'answer'];
    json2csv({data: objs, del: '\t', quotes: ''}, function(err, csv){
      fs.writeFile('file.csv', csv, function(err) {
        res.download('file.csv');
      });
    });
  });
});

module.exports = router;
