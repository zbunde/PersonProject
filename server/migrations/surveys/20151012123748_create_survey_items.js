
exports.up = function(knex, Promise) {
  return knex.schema.createTable('survey_items', function (t) {
    t.increments('id');
    t.integer('survey_id').references('surveys.id')
    t.string('strategy');
    t.string('item_type').notNullable();
    t.text('title').notNullable();
    t.string('layout').notNullable();
    t.integer('position').notNullable();
    t.json('options');
    t.json('sub_questions');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('survey_items');
};
