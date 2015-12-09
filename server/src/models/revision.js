var bookshelf = require('../config/connection').surveys;
var Survey = require('./survey');
var Questions = require('./question');

var Revison = bookshelf.Model.extend({
  tableName: 'revisions',
  hasTimestamps: true,
  survey: function () {
    return this.belongsTo(Survey);
  },
  questions: function () {
    return this.belongsToMany(Questions, 'questions_revisions', 'question_id');
  }
});

module.exports = Revison;
