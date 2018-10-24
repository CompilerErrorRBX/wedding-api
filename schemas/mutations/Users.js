const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
  GraphQLBoolean,
} = require('graphql');

const auth = require('../helpers/Authentication');
const schemas = require('../models');
const db = require('../../db/models');

module.exports = {
  name: 'users',
  mutation: {
    userUpdate: {
      type: schemas.User,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (_, args, req) => {
        const user = await auth.requireAuth(req);

        return user.update(args);
      },
    },

    userAddRole: {
      type: schemas.User,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, req) => {
        await auth.userHasRole(req, 'Admin');

        const role = await db.role.find({ where: { role: args.role } });
        if (!role) {
          throw new GraphQLError(`Role "${args.role}" does not exist.`);
        }

        const user = await db.user.find({ where: { id: args.userId } });
        if (!user) {
          throw new GraphQLError(`Could not find user with id "${args.userId}"`);
        }

        await user.addRole(role);
        return user;
      },
    },

    userRemoveRole: {
      type: schemas.User,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, req) => {
        await auth.userHasRole(req, 'Admin');

        const user = await db.user.find({ where: { id: args.userId } });
        if (!user) {
          throw new GraphQLError(`Could not find user with id "${args.userId}"`);
        }

        const role = await user.getRoles({ where: { role: args.role } });
        if (!role) {
          throw new GraphQLError(`User does not have the role "${args.role}"`);
        }

        await user.removeRole(role);
        return user;
      },
    },
  },
}
