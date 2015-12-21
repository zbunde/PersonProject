var express = require('express');
var router = express.Router();
var multiline = require('multiline');
var auth = require('../../../../middleware/auth/index');
var bookshelf = require('../../../../config/connection').surveys;
/*var Promise = require('bluebird');
var _ = require('lodash');
var Survey = require('../../../../models/survey');
var Field = require('../../../../models/field');
var Completion = require('../../../../models/completion');
var Answer = require('../../../models/answer');
var User = require('../../../models/user');
var json2csv = require('json2csv');
*/

router.get('/', auth.ensureLoggedIn, auth.ensureAdmin, function(req, res) {
  var query = multiline.stripIndent(function(){/*
    select surveys.id, surveys.name, count(*) as completion_count 
    from surveys
    join completions on surveys.id = completions.survey_id
    group by surveys.id;
  */});

  bookshelf.knex.raw(query).then(function(data){
    var obj = {surveys: []};

    data.rows.forEach(function(r) {
      obj.surveys.push({id: r.id,
                        name: r.name,
                        completionCount: r.completion_count
                      });
    });

    return res.json(obj);
  });
});

module.exports = router;