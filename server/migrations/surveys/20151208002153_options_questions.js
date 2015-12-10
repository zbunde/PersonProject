
exports.up = function(knex, Promise) {
  return knex.schema.createTable('options_questions', function (t) {
    t.string('option_id').references('options.id');
    t.string('question_id').references('questions.id');
  });
};

exports.down = function(knex, Promise) {

};
