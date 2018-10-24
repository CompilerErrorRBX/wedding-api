const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');

const config = require('../../config');
const db = require('../../db/models');

const NODE_ENV = process.env.NODE_ENV || 'development';
const Authentication = {};

Authentication.requireAuth = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new GraphQLError('Missing authentication token.');
  }

  return jwt.verify(token, config[NODE_ENV].tokenSecret, (err, decoded) => {
    if (err) {
      throw new GraphQLError(err);
    }

    return db.user.find({
        where: { id: decoded.id },
        include: [
          { model: db.role, as: 'roles', through: { attributes: [] } },
        ]
      }).then((user) => {
      if (!user) {
        throw new GraphQLError('Invalid authentication token.');
      }

      req.user = user;
      return user
    });
  });
}

Authentication.userHasRole = async (req, ...roleList) => {
  const user = await Authentication.requireAuth(req);

  for (let i = 0; i < user.roles.length; i++) {
    const role = user.roles[i];
    if (roleList.indexOf(role.role) > -1) {
      return true;
    }
  }

  throw new GraphQLError('Unauthorized.');
}

module.exports = Authentication;
