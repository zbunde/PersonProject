
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.boolean('admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {

};
