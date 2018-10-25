const { makeExecutableSchema } = require('graphql-tools');
const glob = require('glob');

const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const types = [];
const resolvers = [];
const thisIndex = `${__dirname}/index.js`.replace(/\\/g, '/');

glob.sync(`${__dirname}/**/index.js`).forEach((file) => {
  if (file === thisIndex) {
    return;
  }
  const data = require(file);

  types.push(data.types[0]);
  resolvers.push(data.resolvers);
});

module.exports = makeExecutableSchema({ typeDefs: mergeTypes(types, { all: true }), resolvers: mergeResolvers(resolvers) })
