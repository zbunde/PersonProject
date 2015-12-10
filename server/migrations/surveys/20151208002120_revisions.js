
exports.up = function(knex, Promise) {
  return knex.schema.createTable('revisions', function (t) {
    t.increments('id').primary();
    t.integer('version').notNullable();
    t.string('status').notNullable();
    t.integer('survey_id').references('surveys.id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
