var dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'princeton-development',
    charset: 'utf8'
  }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
