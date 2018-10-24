const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
} = require('graphql');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const schemas = require('../models');
const db = require('../../db/models');
const User = require('../../helpers/user');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  name: 'login',
  mutation: {
    login: {
      type: schemas.UserLogin,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        return db.user.find({ where: { email: args.email } }).then((user) => {
          if (!user) {
            throw new GraphQLError('Invalid email address or password.');
          }
          return argon2.verify(user.password, args.password).then(match => {
            if (match) {
              const token = jwt.sign({ id: user.id }, config[NODE_ENV].tokenSecret, {
                expiresIn: config.token.expiration,
              });

              return { token, user };
            } else {
              throw new GraphQLError('Invalid email address or password.');
            }
          });
        });
      },
    },

    register: {
      type: schemas.UserLogin,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        middleName: { type: GraphQLString },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return db.user.find({where: { email: args.email }}).then((user) => {
          if (user) {
            throw new GraphQLError('Email address is in use.');
          }
          return User.create(args).then((user) => {
            const token = jwt.sign({ id: user.id }, config[NODE_ENV].tokenSecret, {
              expiresIn: config.token.expiration,
            });

            return { token, user };
          });
        });
      },
    },
  },
}
