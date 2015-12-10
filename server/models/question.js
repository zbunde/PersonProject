var bookshelf = require('../config/connection').surveys;
require('./revision');
require('./option');

module.exports = bookshelf.model('Question', {
  tableName: 'questions',
  hasTimestamps: true,
  revisions: function () {
    return this.belongsToMany('Revision');
  },
  options: function () {
    return this.belongsToMany('Option');
  }
});
