const server = require('express')();
const { createServer } = require('http');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/models');

const port = process.env.PORT || 3000;

// require('./scrapers');
const schema = require('./api');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true,
}));

server.use('/api', bodyParser.json(), graphqlExpress(req => ({ schema, context: { req, db } })));

server.use('/ui', graphiqlExpress({
  endpointURL: '/api',
}));

const ws = createServer(server);

ws.listen(port, () => {
  console.log(`Wedding API running at http://localhost:${port}/ui`);
});
