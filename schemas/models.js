const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: user => user.id,
    },
    firstName: {
      type: GraphQLString,
      resolve: user => user.firstName,
    },
    middleName: {
      type: GraphQLString,
      resolve: user => user.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: user => user.lastName,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    phone: {
      type: GraphQLString,
      resolve: user => user.phone,
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => user.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: user => user.updatedAt.toISOString(),
    },
    roles: {
      type: new GraphQLList(Role),
      resolve: user => user.getRoles({ order: [['role', 'DESC']] }),
    },
    events: {
      type: new GraphQLList(Event),
      resolve: user => user.getEvents({ order: [['createdAt', 'DESC']] }),
    },
    address: {
      type: Address,
      resolve: user => user.getAddress(),
    },
    rsvp: {
      type: RSVP,
      resolve: user => user.rsvp,
    }
  })
});

const Role = new GraphQLObjectType({
  name: 'Role',
  description: 'Role representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: role => role.id,
    },
    role: {
      type: GraphQLString,
      resolve: role => role.role,
    },
    createdAt: {
      type: GraphQLString,
      resolve: role => role.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: role => role.updatedAt.toISOString(),
    },
    users: {
      type: new GraphQLList(User),
      resolve: role => role.getUsers({ order: [['lastName', 'DESC']] }),
    },
  })
});

const Address = new GraphQLObjectType({
  name: 'Address',
  description: 'Address representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: address => address.id,
    },
    addressLine1: {
      type: GraphQLString,
      resolve: address => address.addressLine1,
    },
    addressLine2: {
      type: GraphQLString,
      resolve: address => address.addressLine2,
    },
    city: {
      type: GraphQLString,
      resolve: address => address.city,
    },
    state: {
      type: GraphQLString,
      resolve: address => address.state,
    },
    zip: {
      type: GraphQLString,
      resolve: address => address.zip,
    },
    country: {
      type: GraphQLString,
      resolve: address => address.country,
    },
    createdAt: {
      type: GraphQLString,
      resolve: address => address.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: address => address.updatedAt.toISOString(),
    },
  })
});

const Event = new GraphQLObjectType({
  name: 'Event',
  description: 'Event representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: event => event.id,
    },
    title: {
      type: GraphQLString,
      resolve: event => event.title,
    },
    description: {
      type: GraphQLString,
      resolve: event => event.description,
    },
    thumbnail: {
      type: GraphQLString,
      resolve: event => event.thumbnail,
    },
    date: {
      type: GraphQLString,
      resolve: event => event.date.toISOString(),
    },
    rsvpBy: {
      type: GraphQLString,
      resolve: event => event.rsvpBy.toISOString(),
    },
    createdAt: {
      type: GraphQLString,
      resolve: event => event.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: event => event.updatedAt.toISOString(),
    },
    attendees: {
      type: new GraphQLList(User),
      resolve: user => user.getAttendees({
        order: [['lastName', 'DESC']],
        through: {
          attributes: ['confirmed'],
        },
      }),
    },
    address: {
      type: Address,
      resolve: event => event.getAddress(),
    },
    registries: {
      type: new GraphQLList(RegistrySource),
      resolve: source => source.getRegistries({ order: [['store', 'DESC']] }),
    },
  })
});

const RSVP = new GraphQLObjectType({
  name: 'RSVP',
  description: 'RSVP representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: rsvp => rsvp.id,
    },
    confirmed: {
      type: GraphQLBoolean,
      resolve: rsvp => rsvp.confirmed,
    },
    createdAt: {
      type: GraphQLString,
      resolve: rsvp => rsvp.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: rsvp => rsvp.updatedAt.toISOString(),
    },
  })
});

const UserLogin = new GraphQLObjectType({
  name: 'UserLogin',
  description: 'User Login representation',
  fields: () => ({
    user: {
      type: User,
      resolve: userlogin => userlogin.user,
    },
    token: {
      type: GraphQLString,
      resolve: userlogin => userlogin.token,
    },
  })
});

const RegistrySource = new GraphQLObjectType({
  name: 'RegistrySource',
  description: 'Registry Source representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: source => source.id,
    },
    url: {
      type: GraphQLString,
      resolve: source => source.url,
    },
    title: {
      type: GraphQLString,
      resolve: source => source.title,
    },
    store: {
      type: GraphQLString,
      resolve: source => source.store,
    },
    createdAt: {
      type: GraphQLString,
      resolve: source => source.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: source => source.updatedAt.toISOString(),
    },
    items: {
      type: new GraphQLList(RegistryItem),
      resolve: source => source.getItems({ order: [['name', 'DESC']] }),
    },
    event: {
      type: Event,
      resolve: source => source.getEvent(),
    },
  })
});

const RegistryItem = new GraphQLObjectType({
  name: 'RegistryItem',
  description: 'Registry Item representation',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: item => item.id,
    },
    url: {
      type: GraphQLString,
      resolve: item => item.url,
    },
    thumbnail: {
      type: GraphQLString,
      resolve: item => item.thumbnail,
    },
    name: {
      type: GraphQLString,
      resolve: item => item.name,
    },
    price: {
      type: GraphQLString,
      resolve: item => item.price,
    },
    quantity: {
      type: GraphQLInt,
      resolve: item => item.quantity,
    },
    desiredQuantity: {
      type: GraphQLInt,
      resolve: item => item.desiredQuantity,
    },
    createdAt: {
      type: GraphQLString,
      resolve: item => item.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: item => item.updatedAt.toISOString(),
    },
    source: {
      type: RegistrySource,
      resolve: source => source.getSource(),
    },
  })
});

module.exports = {
  User,
  Role,
  Address,
  Event,
  RSVP,
  UserLogin,
  RegistrySource,
  RegistryItem,
};
