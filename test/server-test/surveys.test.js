var dbConfig = require('../../server/config/connection')
var knex = require('knex')
var app = require('../../server/app')
var request = require('supertest')(app)
var User = require('../../server/models/user')
var createUser = require('../../server/lib/create_user');
var createAdmin = require('../../server/lib/create_admin');

function truncateAll(knex) {
  var sql = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"
  return dbConfig.surveys.knex.raw(sql).then(function (response) {
    var tableNames = response.rows.map(function(row){ return row.tablename })
    return dbConfig.surveys.knex.raw('TRUNCATE ' + tableNames.join() + ' CASCADE');
  })
}

describe("csv", function() {
    it("should not allow a non admin user to request a CSV ", function(done) {
      request.get('/api/v1/admin/surveys/csv?sid=7&sid=8&q7=lone-q1&q8=dprs-q1&include=first')
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
});
