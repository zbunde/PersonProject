
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id');
    t.string('username').notNullable().unique();
    t.string('hashed_pass').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('users');
};
