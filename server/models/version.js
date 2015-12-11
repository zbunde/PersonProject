var bookshelf = require('../config/connection').surveys;
require('./survey');
require('./question');

module.exports = bookshelf.model('Version', {
  tableName: 'versions',
  hasTimestamps: true,
  survey: function(){
    return this.belongsTo('Survey');
  },
  questions: function(){
    return this.belongsToMany('Question');
  }
});
