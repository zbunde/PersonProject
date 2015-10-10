// knex.raw('TRUNCATE ' + tableNames.join() + ' CASCADE');
// function clean(knex, passedInOptions) {
//   var options = _.defaults({}, passedInOptions, DefaultOptions);
//
//   return knexTables.getTableNames(knex, options)
//   .then(function(tables) {
//     if (options.mode === 'delete') {
//       return cleanTablesWithDeletion(knex, tables, options);
//     } else {
//       return cleanTablesWithTruncate(knex, tables, options);
//     }
//   });
//
// }
describe("foo", function () {
  it("bar", function () {
    expect('it').to.equal('it')
  })
})
