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
  name: 'events',
  mutation: {
    eventCreate: {
      type: schemas.Event,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        rsvpBy: { type: new GraphQLNonNull(GraphQLString) },
        thumbnail: { type: GraphQLString },
      },
      resolve: async (_, args, req) => {
        // await auth.userHasRole(req, 'Admin');

        return db.event.create(args);
      },
    },
    eventRSVP: {
      type: schemas.Event,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, req) => {
        const user = await auth.requireAuth(req);
        const event = await db.event.find({ where: { id: args.eventId } }).catch(err => { throw new GraphQLError(err) });
        if (!event) {
          throw new GraphQLError('Invalid event id.');
        }

        return event.addAttendee(user);
      },
    },
    eventConfirmRSVP: {
      type: schemas.RSVP,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        confirmed: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: async (_, args, req) => {
        await auth.userHasRole(req, 'Admin');

        const user = await db.user.find({ where: { id: args.userId } }).catch(err => { throw new GraphQLError(err) });
        if (!user) {
          throw new GraphQLError('Invalid user id.');
        }

        const details = await user.getEvents({
          where: { id: args.eventId },
          through: {
            attributes: ['id'],
          },
        });

        if (details) {
          const rsvp = await db.rsvp.find({ where: { id: details[0].rsvp.id } });

          if (args.confirmed) {
            return await rsvp.update({ confirmed: true });
          }

          return rsvp.destroy();
        } else {
          throw new GraphQLError(`User has not RSVP'd to the event titled: "${event.title}"`);
        }
      },
    },
    eventAddRegistry: {
      type: schemas.RegistrySource,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        store: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, req) => {
        // await auth.userHasRole(req, 'Admin');

        const event = await db.event.find({ where: { id: args.eventId } });
        if (!event) {
          throw new GraphQLError(`Could not find event by id "${args.eventId}"`);
        }

        const registry = await db['registry-source'].create(args);
        await event.addRegistry(registry);
        return registry;
      },
    },
  },
}
