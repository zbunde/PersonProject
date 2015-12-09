
exports.up = function(knex, Promise) {
  return knex.schema.createTable('options_questions', function (t) {
    t.integer('option_id').notNullable().index();
    t.integer('question_id').notNullable().index();
  });
};

exports.down = function(knex, Promise) {

};
