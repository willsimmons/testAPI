//environmental variables
require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT, SERVER_HOST} = process.env;

//hapi setup
const hapi = require('hapi');
const routes = require('./routes').routeTable;
const inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const Package = require('./package');
const Vision = require('vision');
const server = hapi.server({
  port: SERVER_PORT,
  host: SERVER_HOST,
});

//graphQL setup
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');

//MongoDB setup
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,{useNewUrlParser:true});
mongoose.connection.once('open',() => {
  console.log('connected to MongoDB named testAPI');
});

const init = async () => {
  //hapi plugins
  try{
    await server.register([
      {
        plugin: graphqlHapi,
        options: {
          path: '/graphql',
          graphqlOptions:{
            schema
          },
          route: {
            cors: true,
          }
        },
      }, {
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql'
          },
          route: {
            cors: true,
          }
        }
      },
      inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'TestAPI API documentation',
            version: Package.version
          },
        }
      }
    ]);
  } catch (e) {
    console.error(e, 'plugin(s) not configured properly');
  }
  try {
    await server.route(routes);
  } catch (e){
    console.error('fix routes mistake');
  }
  try {
    await server.start();
  } catch (e) {
    console.error(e, 'cannot start');
  }
  console.log(`Server running at ${server.info.uri}`);
};

init();
