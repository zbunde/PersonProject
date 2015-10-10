'use strict'

process.env.NODE_ENV = 'test'

var Knex = require('knex')
var format = require('util').format
var settings = require('../config/db')
var childProcess = require('child_process')

function createDB(name) {
  return new Promise(function (resolve, reject) {
    var child = childProcess.exec('createdb ' + name);
    child.on('exit', function () {
      resolve()
    })
    child.on('error', function () {
      reject()
    })
  })
}

Promise.all([
  createDB(settings.users.connection.database),
  createDB(settings.surveys.connection.database)
]).then(function () {
  console.log("Created test databases");
  return Promise.all(Object.keys(settings).map(function (database) {
    var client = Knex(settings[database])

    return client.migrate.latest().then(function () {
      console.log('%s database migrations complete', database)
      return client.destroy()
    })
  })).then(function () {
    console.log('All migrations complete')
  })
}).catch(function (err) {
  console.log(err);
})
