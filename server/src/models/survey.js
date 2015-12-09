var bookshelf = require('../config/connection').surveys
var Revisons = require('./revision');

var Survey = bookshelf.Model.extend({
  tableName: 'surveys',
  hasTimestamps: true,
  revisions: function() {
    return this.hasMany(Revisons);
  }
});

module.exports = Survey;
