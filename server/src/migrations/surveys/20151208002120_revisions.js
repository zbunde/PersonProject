
exports.up = function(knex, Promise) {
  return knex.schema.createTable('revisions', function (t) {
    t.increments('id').primary().index();
    t.integer('version').notNullable();
    t.string('status').notNullable();
    t.integer('survey_id').notNullable().references('id').inTable('surveys').index();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
