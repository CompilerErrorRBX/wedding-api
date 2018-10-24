const {
  GraphQLString,
} = require('graphql');

const Pagination = require('../helpers/Pagination');
const schemas = require('../models');
const db = require('../../db/models');

module.exports = {
  name: 'events',
  query: {
    type: Pagination.PaginatedList(schemas.Event),
    args: {
      id: { type: GraphQLString },
      ...Pagination.PaginationArgs,
    },
    resolve(root, args) {
      return Pagination.PaginatedFindAll(db.event, args);
    },
  },
};
