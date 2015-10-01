var usersConnectionConfig = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'person-project-development',
      user     : process.env.USER || '',
      password : process.env.PASS || '',
      charset: 'utf8'
    }
};

var usersDatabaseConnection = require('knex')(usersConnectionConfig);
var bookshelf = require('bookshelf')(usersDatabaseConnection);

var User = bookshelf.Model.extend({
  tableName: 'users'
  // add associations here
  // many-to-many
  // this.hasMany(Survey, "survey_id")
});

module.exports = User;
