'use strict';
module.exports = function(sequelize, DataTypes) {
  var SurveyItem = sequelize.define('SurveyItem', {
    surveyId: DataTypes.INTEGER,
    strategy: DataTypes.STRING,
    itemType: DataTypes.STRING,
    title: DataTypes.STRING,
    layout: DataTypes.STRING,
    position: DataTypes.INTEGER,
    options: DataTypes.JSON,
    subQuestions: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SurveyItem;
};