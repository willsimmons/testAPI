//environmental variables
require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT, SERVER_HOST} = process.env;

//hapi setup
const hapi = require('hapi');
const routes = require('./routes').routeTable;
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

//launch
const init = async () => {
  //graphql
  try{
    await server.register({
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
    });
  } catch(e) {
    console.error('fix graphql');
  }
  //graphiql ide for graphQL, only for dev branch
  try{
    await server.register({
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
    })
  } catch (e) {
    console.error('graphiql is not configured')
  }
  try {
    await server.route(routes);
  } catch (e){
    console.error('fix routes mistake');
  }
  try {
    await server.start();
  } catch (e) {
    console.error('cannot start');
  }
  console.log(`Server running at ${server.info.uri}`);
};

init();
