
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions_revisions', function (t) {
    t.integer('question_id').notNullable().index();
    t.integer('revision_id').notNullable().index();
  });
};

exports.down = function(knex, Promise) {

};
