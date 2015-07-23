var bookshelf = require('../models/database');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;
