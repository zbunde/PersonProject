var bookshelf = require('../config/connection').surveys;
require('./survey');
require('./question');

module.exports = bookshelf.model('Revision', {
  tableName: 'revisions',
  hasTimestamps: true,
  survey: function () {
    return this.belongsTo('Survey');
  },
  questions: function () {
    return this.belongsToMany('Question');
  }
});
