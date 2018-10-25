'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return db.registrySource.create({
      url: 'https://www.bedbathandbeyond.com/store/giftregistry/viewregistryguest/546108498',
      title: 'Bed Bath and Beyond Registry',
      store: 'bedbathbeyond',
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
