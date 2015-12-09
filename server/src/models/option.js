var bookshelf = require('../config/connection').surveys;
var Questions = require('./question');

var Option = bookshelf.Model.extend({
  tableName: 'options',
  hasTimestamps: true,
  questions: function () {
    return this.belongsToMany(Questions);
  }
});

module.exports = Option;
