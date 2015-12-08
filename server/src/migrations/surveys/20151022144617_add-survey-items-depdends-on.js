
exports.up = function(knex, Promise) {
  return knex.schema.table('survey_items', function (table) {
    table.json('depends_on');
  });
};

exports.down = function(knex, Promise) {

};
