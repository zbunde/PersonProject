
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function (t) {
    t.increments('id').primary();
    t.integer('group_number');
    t.integer('order').notNullable();
    t.text('text').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
