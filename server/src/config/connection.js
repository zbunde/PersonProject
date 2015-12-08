var dbConfig = require('./db')
var knex = require('knex')
var bookshelf = require('bookshelf')

var usersBookshelfConnection = knex(dbConfig.users);
var usersBookshelf = bookshelf(usersBookshelfConnection);

var surveysBookshelfConnection = knex(dbConfig.surveys);
var surveysBookshelf = bookshelf(surveysBookshelfConnection);

module.exports = {
  users: usersBookshelf,
  surveys: surveysBookshelf
}
