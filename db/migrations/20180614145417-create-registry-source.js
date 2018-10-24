'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registry-sources', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
      },
      store: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
      },
      eventId: {
        type: Sequelize.STRING(36),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('registry-sources');
  }
};