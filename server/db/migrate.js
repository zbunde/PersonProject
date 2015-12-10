'use strict'

require('dotenv').config({path: '.env'});

var Knex = require('knex')
var format = require('util').format
var settings = require('../config/db')

if (process.argv[2]) {
  var client = Knex(settings[process.argv[2]])

  if (process.argv[3] === 'rollback') {
    client.migrate.rollback().then(function () {
      console.log('%s database rollback complete', process.argv[2])
      return client.destroy()
    })
  } else {
    client.migrate.latest().then(function () {
      console.log('%s database migrations complete', process.argv[2])
      return client.destroy()
    })
  }
} else {
  Promise.all(Object.keys(settings).map(function (database) {
    var client = Knex(settings[database])

    return client.migrate.latest().then(function () {
      console.log('%s database migrations complete', database)
      return client.destroy()
    })
  })).then(function () {
    console.log('All migrations complete')
  })
}
