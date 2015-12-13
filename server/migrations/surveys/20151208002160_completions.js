
exports.up = function(knex, Promise) {
  return knex.schema.createTable('completions', function (t) {
    t.increments('id').primary();
    t.integer('survey_id').references('surveys.id');
    t.integer('version_id').references('versions.id');
    t.integer('user_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
