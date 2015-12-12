var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');
var Version = require('../../../models/version');
var Question = require('../../../models/question');
var Field = require('../../../models/field');

var bookshelf = require('../../../config/connection').surveys;
router.get('/:id', function (req, res, next){
  bookshelf.knex.raw("select q.id as qid, q.group as qgroup, q.position as qposition, q.text as qtext, q.dependent_id as qdependendid, f.id as fid, f.value as fvalue, f.position as fposition, f.text as ftext, f.widget as fwidget, f.metadata as fmetadata, fq.* from fields f inner join fields_questions fq on f.id = fq.field_id inner join questions q on q.id = fq.question_id where fq.question_id in (select q.id from questions q inner join questions_versions qv on q.id = qv.question_id and qv.version_id = (select version from versions where survey_id = ? order by version desc limit 1))", req.params.id).then(function(data){
    var obj = {};
    data.rows.forEach(function(r){
      if(!obj[r.qid]){
        obj[r.qid] = {};
        obj[r.qid].question = {};
        obj[r.qid].fields = [];

        obj[r.qid].question.id = r.qid;
        obj[r.qid].question.text = r.qtext;
        obj[r.qid].question.position = r.qposition;
        obj[r.qid].question.group = r.qgroup;
        obj[r.qid].question.dependent_id = r.qdependendid;
      }

      obj[r.qid].fields.push({id: r.fid, value: r.fvalue, position: r.fposition, text: r.ftext, widget: r.fwidget, metadata: r.fmetadata});
    });

    res.json({obj: obj});
  });
});

module.exports = router;
