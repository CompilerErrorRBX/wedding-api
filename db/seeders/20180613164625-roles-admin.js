const db = require('../models');

module.exports = {
  up: () => {
    return db.role.create({
      role: 'Admin',
      description: 'A site administrator',
    });
  },

  down: () => {
    return db.role.find({
      where: {
        role: 'Admin'
      },
    }).then((role) => {
      role.destroy();
    });
  }
};
