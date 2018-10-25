'use strict';
const db = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return db.registrySource.create({
      url: 'https://www.target.com/gift-registry/giftgiver?registryId=ed445290729a4570908293305a336871&type=WEDDING',
      title: 'Target Registry',
      store: 'target',
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
