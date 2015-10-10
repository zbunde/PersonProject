'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('SurveyItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      surveyId: {
        type: Sequelize.INTEGER
      },
      strategy: {
        type: Sequelize.STRING
      },
      itemType: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      layout: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.INTEGER
      },
      options: {
        type: Sequelize.JSON
      },
      subQuestions: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('SurveyItems');
  }
};