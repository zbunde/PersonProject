var usersKnexConfig = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'person-project-development',
      user     : process.env.USER || '',
      password : process.env.PASS || '',
      charset: 'utf8'
    }
};

var usersBookshelfConnection = require('knex')(usersKnexConfig);
var usersBookshelf = require('bookshelf')(usersBookshelfConnection);

var User = usersBookshelf.Model.extend({
  tableName: 'users'
  // add associations here
  // many-to-many
  // this.hasMany(Survey, "survey_id")
});

module.exports = User;
