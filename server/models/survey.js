var bookshelf = require('../config/connection').surveys
require('./revision');

module.exports = bookshelf.model('Survey', {
  tableName: 'surveys',
  hasTimestamps: true,
  revisions: function() {
    return this.hasMany('Revision');
  }
});
