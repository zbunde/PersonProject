
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function (t) {
    t.string('id').primary();
    t.integer('group');
    t.integer('order');
    t.text('text');
    t.string('dependent_id').references('questions.id');
    t.integer('survey_id').references('surveys.id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
