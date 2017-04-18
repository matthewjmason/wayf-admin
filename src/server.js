

var graphqlModule = require("graphql");
var graphql = graphqlModule.graphql;
var GraphQLSchema = graphqlModule.GraphQLSchema;
var GraphQLObjectType = graphqlModule.GraphQLObjectType;
var GraphQLString = graphqlModule.GraphQLString;
var GraphQLScalarType = graphqlModule.GraphQLScalarType;
var GraphQLInt = graphqlModule.GraphQLInt;


var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch = require('node-fetch');



var DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  });

var PublisherSessionType = new GraphQLObjectType({
  name: 'PublisherSessionType',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The wayf id of the session.',
    },
    localId: {
      type: GraphQLString,
      description: 'The local id of the session.',
    },
    device :{
      type: DeviceType,
      resolve: (publisherSession) => {
        return fetchDevice(publisherSession.device.id);
      }
    },
    createdDate: {
      type: DateType
    }
  })
});

var DeviceType = new GraphQLObjectType({
  name: 'DeviceType',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    createdDate: {
      type: DateType
    },
    modifiedDate: {
      type: DateType
    }
  })
});

// The root provides a resolver function for each API endpoint
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      publisherSession: {
        type: PublisherSessionType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => fetchPublisherSession(args.id)
      },
      device: {
        type: DeviceType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => fetchDevice(args.id)
      }
    }
  })
});

const BASE_URL = 'http://localhost:8080';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPublisherSession(id) {
  console.log(`fetching publisher session ${id}`);

  return fetchResponseByURL(`/1/publisherSession/${id}`);
}

function fetchDevice(id) {
  console.log(`fetching device ${id}`);

  return fetchResponseByURL(`/1/device/${id}`);
}

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },

  publisherSession: () => {
          return '';
        }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');