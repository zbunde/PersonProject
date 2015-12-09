var bookshelf = require('../config/connection').surveys;
var Survey = require('./survey');

var Revison = bookshelf.Model.extend({
  tableName: 'revisions',
  hasTimestamps: true,
  survey: function () {
    return this.belongsTo(Survey);
  }
});

module.exports = Revison;
