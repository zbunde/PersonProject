var bookshelf = require('../config/connection').users

var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;
