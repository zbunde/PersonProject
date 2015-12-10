var dbConfig = require('./db')
var knex = require('knex')
var bookshelf = require('bookshelf')

var usersBookshelfConnection = knex(dbConfig.users);
var surveysBookshelfConnection = knex(dbConfig.surveys);

var usersBookshelf = bookshelf(usersBookshelfConnection);
var surveysBookshelf = bookshelf(surveysBookshelfConnection);

usersBookshelf.plugin('registry');
surveysBookshelf.plugin('registry');

module.exports = {
  users: usersBookshelf,
  surveys: surveysBookshelf
}
