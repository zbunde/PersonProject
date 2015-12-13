var bookshelf = require('../config/connection').surveys
require('./survey');
require('./version');
require('./answer');

module.exports = bookshelf.model('Completion', {
  tableName: 'completions',
  hasTimestamps: true,
  survey: function(){
    return this.belongsTo('Survey');
  },
  version: function(){
    return this.belongsTo('Version');
  },
  answers: function(){
    return this.hasMany('Answer');
  }
});
