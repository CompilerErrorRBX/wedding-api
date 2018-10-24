const {
  GraphQLString,
} = require('graphql');

const Pagination = require('../helpers/Pagination');
const schemas = require('../models');
const db = require('../../db/models');

module.exports = {
  name: 'registryItems',
  query: {
    type: Pagination.PaginatedList(schemas.RegistryItem),
    args: {
      id: { type: GraphQLString },
      registrySourceId: { type: GraphQLString },
      ...Pagination.PaginationArgs
    },
    resolve(root, args) {
      return Pagination.PaginatedFindAll(db['registry-item'], args);
    },
  },
}
