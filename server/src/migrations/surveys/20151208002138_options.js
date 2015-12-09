
exports.up = function(knex, Promise) {
  return knex.schema.createTable('options', function (t) {
    t.increments('id').primary().index();
    t.integer('value').notNullable();
    t.text('text').notNullable();
    t.integer('order').notNullable();
    t.json('metadata').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
