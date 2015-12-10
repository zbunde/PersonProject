var Promise = require('bluebird');
var Survey = require('../../../models/survey');
var Revision = require('../../../models/revision');
var Question = require('../../../models/question');
var Option = require('../../../models/option');

function createSurvey(data){
  new Survey(data.survey).save().then(function(model){
    data.revision.survey_id = model.id;
    return new Revision(data.revision).save();
  }).then(function(model){
    return Promise.all(data.questions.map(function(q){
      return new Question(q).save(null, {method: 'insert'}).then(function(m){
        return m.revisions().attach(model.id);
      });
    }));
  }).then(function(model){
    return Promise.all(data.options.map(function(o){
      return new Option(o).save(null, {method: 'insert'});
    }));
  }).then(function(model){
    return Promise.all(data.mappings.map(function(mapping){
      return new Question({'id': mapping.q}).fetch().then(function(question){
        return question.options().attach(mapping.o);
      });
    }));
  }).then(function(model){
    console.log('finished');
    process.exit();
  });
}

module.exports = createSurvey;
