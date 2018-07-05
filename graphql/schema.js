const graphql = require('graphql');

const ItemType = require('./ItemType');
const Item = require(`./../models/item.js`);

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: { name: {type: GraphQLString}},
      resolve(parent, args){
        // what happens when the query happens
        let name = args.name;
        return Item.findOne({name});
      }
    }
  }
});

module.exports = new GraphQLSchema({ query:RootQuery });

