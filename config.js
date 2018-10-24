const env = process.env;

module.exports = {
  token: {
    expiration: '1d',
  },
  development: {
    database: {
      username: env.DB_DEV_USER || 'root',
      password: env.DB_DEV_PASS || '',
      host: env.DB_DEV_HOST || 'localhost',
      database: env.DB_DEV_DATABASE || 'wedding_dev',
    },
    admin: {
      password: env.ADMIN_PASS || 'Admin1234',
    },
    tokenSecret: env.TOKEN_SECRET || '8fNAGB+I80IAJ&g25#CcqLaEcZOG}R8<}GT$"9.U~@-x_88_(JpDwXtEUM:ISgV'
  },
  production: {
    database: {
      username: env.DB_PROD_USER,
      password: env.DB_PROD_PASS,
      host: env.DB_PROD_HOST,
      database: env.DB_PROD_DATABASE,
    },
    admin: {
      password: env.ADMIN_PASS,
    },
    tokenSecret: env.TOKEN_SECRET,
  },
};
