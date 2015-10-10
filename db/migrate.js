'use strict'

require('dotenv').load()

var Knex = require('knex')
var format = require('util').format
var settings = require('../config/db')

Promise.all(Object.keys(settings).map(function (database) {
  var client = Knex(settings[database])

  client.migrate.latest().then(function () {
    console.log('%s database migrations complete', database)
  }).then(function () {
    console.log('All migrations complete')
    return client.destroy()
  })
})).then(function () {
  console.log("Migrations complete");
})
