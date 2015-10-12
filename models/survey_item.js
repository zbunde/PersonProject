var bookshelf = require('../config/connection').surveys;
var Survey = require('./survey');

var SurveyItem = bookshelf.Model.extend({
  tableName: 'survey_items',
  survey: function () {
    return this.belongsTo(Survey);
  }
});

module.exports = SurveyItem;
