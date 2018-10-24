const app = require('express')();
const graphHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');

const scrapers = require('./scrapers');
const schema = require('./schemas');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', graphHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

const server = app.listen(3000, () => {
  console.log('Wedding API running on port', server.address().port);
});
