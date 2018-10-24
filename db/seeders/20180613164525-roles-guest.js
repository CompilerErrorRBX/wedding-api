const db = require('../models');

module.exports = {
  up: () => {
    return db.role.create({
      role: 'Guest',
      description: 'Guest of wedding',
    });
  },

  down: () => {
    return db.role.find({
      where: {
        role: 'Guest'
      },
    }).then((role) => {
      role.destroy();
    });;
  }
};
