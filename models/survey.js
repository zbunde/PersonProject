var surveysBookshelfConfig = {
    client: 'pg',
    connection: {
      host: process.env.SURVEYS_DB_HOST || 'localhost',
      database: process.env.SURVEYS_DB_NAME || 'person-project-surveys-development',
      user     : process.env.USER || '',
      password : process.env.PASS || '',
      charset: 'utf8'
    }
};

var surveysBookshelfConnection = require('knex')(surveysBookshelfConfig);
var surveysBookshelf = require('bookshelf')(surveysBookshelfConnection);

var Survey = surveysBookshelf.Model.extend({
  tableName: 'surveys'
  // add associations here
});

module.exports = Survey;
