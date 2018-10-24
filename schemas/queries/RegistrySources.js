const {
  GraphQLString,
} = require('graphql');

const Pagination = require('../helpers/Pagination');
const schemas = require('../models');
const db = require('../../db/models');

module.exports = {
  name: 'registrySources',
  query: {
    type: Pagination.PaginatedList(schemas.RegistrySource),
    args: {
      id: { type: GraphQLString },
      eventId: { type: GraphQLString },
      ...Pagination.PaginationArgs
    },
    resolve(root, args) {
      return Pagination.PaginatedFindAll(db['registry-source'], args);
    },
  },
}
