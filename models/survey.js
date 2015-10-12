var bookshelf = require('../config/connection').surveys
var SurveyItem = require('./survey_item');

var Survey = bookshelf.Model.extend({
  tableName: 'surveys',
  hasTimestamps: true,
  surveyItems: function() {
    return this.hasMany(SurveyItem);
  }
});

module.exports = Survey;
