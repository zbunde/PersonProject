
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions_revisions', function (t) {
    t.integer('question_id').references('questions.id');
    t.integer('revision_id').references('revisions.id');
  });
};

exports.down = function(knex, Promise) {

};
