
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', function (t) {
    t.increments('id').primary().index();
    t.integer('completion_id').notNullable().references('id').inTable('completions').index();
    t.integer('question_id').notNullable().references('id').inTable('questions').index();
    t.integer('option_id').notNullable().references('id').inTable('options').index();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
