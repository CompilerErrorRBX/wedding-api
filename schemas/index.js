const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const queries = require('./queries');
const mutations = require('./mutations');

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Wedding API Root',
  fields: () => queries,
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Wedding API Root',
  fields: () => mutations,
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = Schema;
