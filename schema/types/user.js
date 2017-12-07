const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`,
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve: (obj, args, ctx) => {
        const { pgPool } = ctx;
        return pgdb(pgPool).getContests(obj);
      },
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (obj, args, ctx, { fieldName }) => {
        const { mPool } = ctx;
        return mdb(mPool).getCounts(obj, fieldName);
      },
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (obj, args, ctx, { fieldName }) => {
        const { mPool } = ctx;
        return mdb(mPool).getCounts(obj, fieldName);
      },
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (obj, args, ctx, { fieldName }) => {
        const { mPool } = ctx;
        return mdb(mPool).getCounts(obj, fieldName);
      },
    },
  },
});
