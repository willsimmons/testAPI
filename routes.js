const Item = require('./models/item');

const routeTable = [
  {
    method: 'GET',
    path: '/',
    handler:  (request, reply) => {
      return '<h1>Hello World </h1>';
    },
  },
  {
    method: 'GET',
    path: '/api/v1/items',
    handler: (request,reply) => {
      return Item.find();
    }
  },
  {
    method: 'POST',
    path: '/api/v1/items',
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

