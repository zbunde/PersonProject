var bookshelf = require('../config/connection').surveys

var Survey = bookshelf.Model.extend({
  tableName: 'surveys'
});

module.exports = Survey;
