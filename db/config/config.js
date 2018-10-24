const config = require('../../config');

module.exports = {
  development: {
    username: config.development.database.username,
    password: config.development.database.password,
    database: config.development.database.database,
    host: config.development.database.host,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'Wedding_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: config.production.database.username,
    password: config.production.database.password,
    database: config.production.database.database,
    host: config.production.database.host,
    dialect: 'mysql',
    logging: false,
  }
}
