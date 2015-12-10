
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fields', function (t) {
    t.string('id').primary();
    t.integer('value');
    t.integer('order');
    t.text('text');
    t.json('metadata');
    t.integer('survey_id').references('surveys.id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
