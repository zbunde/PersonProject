
exports.up = function(knex, Promise) {
  return knex.schema.createTable('options_questions', function (t) {
    t.integer('option_id').references('options.id');
    t.integer('question_id').references('questions.id');
  });
};

exports.down = function(knex, Promise) {

};
