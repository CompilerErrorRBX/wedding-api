const {
  GraphQLString,
} = require('graphql');

const Pagination = require('../helpers/Pagination');
const schemas = require('../models');
const db = require('../../db/models');

module.exports = {
  name: 'users',
  query: {
    type: Pagination.PaginatedList(schemas.User),
    args: {
      // role: { type: GraphQLString },
      id: { type: GraphQLString },
      query: { type: GraphQLString },
      ...Pagination.PaginationArgs
    },
    resolve(root, args, context) {
      if (args.query) {
        const query = args.query;
        args['$or'] = [
          { 'firstName': { $like: `%${query}%` } },
          { 'lastName': { $like: `%${query}%` } },
          { 'email': { $like: `%${query}%` } },
        ]
      }

      delete args.query;

      // const include = [];

      // if (args.role) {
      //   const roles = args.role.split(',');
      //   delete args.role;

      //   include.push({ model: db.role, as: 'roles', where: { 'role': { $in: roles } } });
      // }

      const custom = {
        // include,
      };

      return Pagination.PaginatedFindAll(db.user, args, custom);
    },
  },
}
