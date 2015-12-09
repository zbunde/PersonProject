
exports.up = function(knex, Promise) {
  return knex.schema.createTable('completions', function (t) {
    t.increments('id').primary().index();
    t.integer('revision_id').notNullable().references('id').inTable('revisions').index();
    t.integer('user_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
