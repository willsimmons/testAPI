const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    name: {type: GraphQLString},
    colors: {type: GraphQLString},
  })
});

module.exports = ItemType;
