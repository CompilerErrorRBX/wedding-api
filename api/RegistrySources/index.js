const path = require('path');
const gqlMerge = require('merge-graphql-schemas');

const resolvers = require('./resolvers');

const types = gqlMerge.fileLoader(path.join(__dirname.replace('lib', 'src'), '**/*.gql'));

module.exports = { types, resolvers };
