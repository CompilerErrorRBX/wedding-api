module.exports = {
  Query: {
    getSources: async (_, args, context) => {
      const dataSources = await context.db.registrySource.findAll();
      let sources = [];
      for (source of dataSources) {
        console.log(source);
        const src = source.dataValues;
        const items = await source.getItems();
        src.items = items;
        sources.push(src);
      };

      return sources;
    },
  },

  Mutation: {
    addSource: async (_, args, context) => {
      const source = await context.db.registrySource.create(args);
      console.log(source);
      return source;
    },
  },
};
