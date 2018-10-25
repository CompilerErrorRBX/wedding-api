'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return db.registrySource.create({
      url: 'https://www.amazon.com/wedding/natalie-garrison-stephen-martin-springfield-december-2018/registry/1LZJUHFKNRJSU',
      title: 'Amazon Registry',
      store: 'amazon',
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
