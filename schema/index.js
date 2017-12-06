const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const pgdb = require('../database/pgdb');
const MeType = require('./types/me');

// defines root selection scope
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    me: {
      type: MeType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, ctx) => {
        const { pgPool } = ctx;
        return pgdb(pgPool).getUser(args.key);
      },
    },
  },
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: ...,
});

module.exports = ncSchema;
