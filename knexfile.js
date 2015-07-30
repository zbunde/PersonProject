require('dotenv').load()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'person-project-development',
      user     : process.env.USER || '',
      password : process.env.PASS || '',
      charset: 'utf8'
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: './migrations'
    }
  }
};
