var bookshelf = require('../config/connection').surveys
require('./version');
require('./question');
require('./field');

module.exports = bookshelf.model('Survey', {
  tableName: 'surveys',
  hasTimestamps: true,
  versions: function(){
    return this.hasMany('Version');
  },
  questions: function(){
    return this.hasMany('Question');
  },
  fields: function(){
    return this.hasMany('Field');
  }
});
