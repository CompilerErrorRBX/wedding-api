const {
  GraphQLString,
  GraphQLError,
} = require('graphql');

const jwt = require('jsonwebtoken');

const config = require('../../config');
const schemas = require('../models');
const db = require('../../db/models');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  name: 'authenticate',
  query: {
    type: schemas.User,
    args: {
      token: { type: GraphQLString },
    },
    resolve(_, args) {
      return jwt.verify(args.token, config[NODE_ENV].tokenSecret, (err, decoded) => {
        if (err) {
          throw new GraphQLError(err);
        }

        return db.user.find({
          where: { id: decoded.id },
        }).then((user) => {
          if (!user) {
            throw new GraphQLError('Invalid authentication token.');
          }

          return user
        });
      });
    },
  },
};
