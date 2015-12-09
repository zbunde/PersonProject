
exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function (t) {
    t.increments('id').primary().index();
    t.string('name').notNullable().unique();
    t.text('description').notNullable();
    t.integer('est_completion_time_minutes').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
