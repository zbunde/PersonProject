
exports.up = function(knex, Promise) {
  return knex.schema.table('surveys', function (table) {
    table.text('description').notNullable();
    table.integer('estimated_time_to_complete').notNullable();
    table.decimal('version').notNullable();
  });
};

exports.down = function(knex, Promise) {

};
