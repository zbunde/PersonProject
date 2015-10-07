require('dotenv').load();
var surveysKnexConfig = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST_SURVEYS || 'localhost',
      database: process.env.DB_NAME_SURVEYS || 'person-project-surveys-development',
      user     : process.env.SURVEY_DB_USER || '',
      password : process.env.SURVEY_DB_PASS || '',
      charset: 'utf8'
    }
};

var surveysBookshelfConnection = require('knex')(surveysKnexConfig);
var surveysBookshelf = require('bookshelf')(surveysBookshelfConnection);

var Survey = surveysBookshelf.Model.extend({
  tableName: 'surveys'
  // add associations here
});

module.exports = Survey;
