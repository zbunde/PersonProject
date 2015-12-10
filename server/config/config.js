var config = {
  development: {
    db: {
      users: {
        host      : process.env.USERS_DB_HOST     || 'localhost',
        database  : process.env.USERS_DB_DATABASE || 'princeton-users-development',
        user      : process.env.USERS_DB_USERNAME || '',
        password  : process.env.USERS_DB_PASSWORD || '',
      },
      surveys: {
        host     : process.env.SURVEYS_DB_HOST      || 'localhost',
        database : process.env.SURVEYS_DB_DATABASE  || 'princeton-surveys-development',
        user     : process.env.SURVEYS_DB_USERNAME  || '',
        password : process.env.SURVEYS_DB_PASSWORD  || '',
      }
    }
  },
  test: {
    db: {
      users: {
        host      : process.env.USERS_DB_HOST       || 'localhost',
        database  : process.env.USERS_DB_DATABASE   || 'princeton-users-test',
        user      : process.env.USERS_DB_USERNAME   || '',
        password  : process.env.USERS_DB_PASSWORD   || '',
      },
      surveys: {
        host      : process.env.SURVEYS_DB_HOST || 'localhost',
        database  : process.env.SURVEYS_DB_DATABASE || 'princeton-surveys-test',
        user      : process.env.SURVEYS_DB_USERNAME || '',
        password  : process.env.SURVEYS_DB_PASSWORD || '',
      }
    }
  },
  production: {
    db: {
      users: {
        host      : process.env.USERS_DB_HOST,
        database  : process.env.USERS_DB_DATABASE,
        user      : process.env.USERS_DB_USERNAME,
        password  : process.env.USERS_DB_PASSWORD,
      },
      surveys: {
        host      : process.env.SURVEYS_DB_HOST,
        database  : process.env.SURVEYS_DB_DATABASE,
        user      : process.env.SURVEYS_DB_USERNAME,
        password  : process.env.SURVEYS_DB_PASSWORD,
      }
    }
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
