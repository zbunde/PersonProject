var Promise = require('bluebird');
var Survey = require('../../../models/survey');
var Revision = require('../../../models/revision');
var Question = require('../../../models/question');

var survey = {
  name: "Demographics",
  description: "Needs description",
  est_completion_time_minutes: 20
};

new Survey(survey).save().then(function(model) {
  var revision = {
    version: 1,
    status: "in progress",
    survey_id: model.id
  };

  return new Revision(revision).save();
}).then(function(model){
    var questions = [
      {
        text: "What is your gender?",
        order: 1
      },
      {
        text: "What is your age?",
        order: 2
      },
      {
        text: "What is your race/ethnicity?",
        order: 3
      },
      {
        text: "What is your primary language (language spoken at home)?",
        order: 4
      },
      {
        text: "What is the zipcode of your hometown?",
        order: 5
      },
      {
        text: "Which of the following best describes your family's socioeconomic status?",
        order: 6
      }
    ];

    var saves = Promise.all(questions.map(function(q){
      return new Question(q).save();
    }));

    return Promise.join(model, saves);
}).then(function(values){
  var revision = values[0];
  var questions = values[1];

  return Promise.all(questions.map(function(q){
    console.log('q', q);
    console.log('r', revision);
    console.log('-----------------------------------------');

    return q.revisions().attach([q]);
  }));
}).then(function(values){
  console.log('---------------------', values);
  process.exit();
});












//process.exit();
