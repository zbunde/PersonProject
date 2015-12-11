var express = require('express');
var router = express.Router();
var Survey = require('../../../models/survey');
var Version = require('../../../models/version');
var Question = require('../../../models/question');
var Field = require('../../../models/field');

var bookshelf = require('../../../config/connection').surveys;
router.get('/:id', function (req, res, next){
  bookshelf.knex.raw("select q.* from questions q inner join questions_versions qv on q.id = qv.question_id and qv.version_id = (select version from versions where survey_id = ? order by version desc limit 1) order by q.position", req.params.id).then(function(data1){
    var ids = data1.rows.map(function(r){return r.id});
    var qqq = ids.reduce(function(a, c){return a + ',?'}, '').slice(1);
    bookshelf.knex.raw("select f.*, fq.* from fields f inner join fields_questions fq on f.id = fq.field_id where fq.question_id in (" + qqq + ") order by question_id, position", ids).then(function(data2){
      res.json({questions: data1.rows, fields: data2.rows});
    });
  });
});

module.exports = router;
