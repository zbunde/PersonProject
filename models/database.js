var dbConfig = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL || 'localhost',
    database: 'person-project-development',
    charset: 'utf8'
  }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
