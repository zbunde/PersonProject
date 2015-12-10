
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('facebook_id');
    table.string('facebook_token');
    table.json('facebook_user_info')
    table.index('facebook_id', 'facebook_id_index');
  }); 
};

exports.down = function(knex, Promise) {
  
};
