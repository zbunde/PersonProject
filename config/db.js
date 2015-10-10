var config = require('./config')

module.exports = {
  'users' : {
    client: 'pg',
    connection: {
      host: config.db.users.host,
      database: config.db.users.database,
      user: config.db.users.user,
      password: config.db.users.password,
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
      host: config.db.surveys.host,
      database: config.db.surveys.database,
      user: config.db.surveys.user,
      password: config.db.surveys.password,
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
