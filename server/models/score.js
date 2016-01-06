var bookshelf = require('../config/connection').surveys;
require('./completion');

module.exports = bookshelf.model('Score', {
  tableName: 'scores',
  hasTimestamps: true,
  completion: function(){
    return this.belongsTo('Completion');
  }
});
