const Item = require('./models/item');

const routeTable = [
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'Root Route',
      tags: [ 'api', 'root', 'v1'],
    },
    handler:  (request, reply) => {
      return '<h1>Hello World </h1>';
    },
  },
  {
    method: 'GET',
    path: '/api/v1/items',
    config: {
      description: 'Get all of the Items',
      tags: [ 'api', 'Items', 'v1'],
    },
    handler: (request,reply) => {
      return Item.find();
    }
  },
  {
    method: 'POST',
    path: '/api/v1/items',
    config: {
      description: 'Create a new Item',
      tags: [ 'api', 'Items', 'v1'],
    },
    handler: (request, reply) => {
      const {name, colors } = request.payload;
      const item = new Item({
        name,
        colors,
      });
      return item.save();
    }
  },
];

module.exports = {routeTable};

