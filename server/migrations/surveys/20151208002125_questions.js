
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function (t) {
    t.string('id').primary();
    t.integer('group_number');
    t.string('group_type');
    t.string('group_title');
    t.text('group_description');
    t.text('text');
    t.integer('position');
    t.string('dependent_id').references('questions.id');
    t.string('dependent_value');
    t.integer('survey_id').references('surveys.id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
