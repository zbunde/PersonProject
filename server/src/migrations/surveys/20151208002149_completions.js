
exports.up = function(knex, Promise) {
  return knex.schema.createTable('completions', function (t) {
    t.increments('id').primary();
    t.integer('revision_id').references('revisions.id');
    t.integer('user_id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
