const uuidv4 = require('uuid/v4')

module.exports = {
  Query: {
    getRSVPs: async (_, args, context) => {
      const rsvps = await context.db.rsvp.findAll();
      return rsvps;
    },
  },

  Mutation: {
    addRSVP: async (_, args, context) => {
      args.groupId = uuidv4();
      const rsvp = await context.db.rsvp.create(args);
      console.log(rsvp);
      return rsvp;
    },
    addGroupRSVP: async (_, args, context) => {
      const rsvps = [];
      const groupId = uuidv4();
      for (name of args.rsvps.names) {
        const rsvpData = { groupId, fullName: name, confirmed: args.rsvps.confirmed }
        const rsvp = await context.db.rsvp.create(rsvpData);
        rsvps.push(rsvp);
      }
      console.log(rsvps);
      return rsvps;
    },
  },
}
