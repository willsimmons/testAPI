const hapi = require('hapi');

const server = hapi.server({
  port: 3000,
  host: 'localhost'
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
