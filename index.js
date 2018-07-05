require('dotenv').config();
const hapi = require('hapi');

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT, SERVER_HOST} = process.env;

//MongoDB
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,{useNewUrlParser:true});
mongoose.connection.once('open',() => {
  console.log('connected to MongoDB named testAPI');
});

const server = hapi.server({
  port: SERVER_PORT,
  host: SERVER_HOST,
});

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function(request,reply){
      return'<h1>Hello World </h1>';
    }
  });
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
