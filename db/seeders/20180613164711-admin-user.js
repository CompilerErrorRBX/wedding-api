const db = require('../models');
const User = require('../../helpers/user');
const config = require('../../config');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  up: () => {
    return User.create({
      email: 'admin@wedding.com',
      firstName: 'Admin',
      lastName: '',
      password: config[NODE_ENV].admin.password,
    }).then((user) => {
      return db.role.find({
        where: { role: 'Admin' },
      }).then((role) => {
        return user.addRole(role);
      });
    });
  },

  down: () => {
    return db.user.find({
      where: { email: 'admin@wedding.com' },
    }).then((user) => {
      user.destroy();
    });
  }
};
