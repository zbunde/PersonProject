var bookshelf = require('../config/connection').surveys;
require('./question');

module.exports = bookshelf.model('Option', {
  tableName: 'options',
  hasTimestamps: true,
  questions: function () {
    return this.belongsToMany('Question');
  }
});
