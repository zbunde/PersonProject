var bookshelf = require('../config/connection').surveys;
var Revisions = require('./revision');
var Options = require('./option');

var Question = bookshelf.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  revisions: function () {
    return this.belongsToMany(Revisions);
  },
  options: function () {
    return this.belongsToMany(Options);
  }
});

module.exports = Question;
