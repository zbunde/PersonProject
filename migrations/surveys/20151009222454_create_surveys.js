
exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function (t) {
    t.increments('id');
    t.string('name').notNullable().unique();
    t.string('status').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('surveys');
};
