module.exports = {
  'users' : {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'princeton-users-development',
      user     : process.env.USER || '',
      password : process.env.PASS || '',
      charset: 'utf8'
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: './migrations/users'
    }
  },
  'surveys' : {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'princeton-surveys-development',
      user     : process.env.USER || '',
      password : process.env.PASS || '',
      charset: 'utf8'
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: './migrations/surveys'
    }
  }
}
