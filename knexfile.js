module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL || 'localhost',
      database: 'princeton-development',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    }
  }
};
