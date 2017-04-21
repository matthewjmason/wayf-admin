/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLScalarType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';


var fetch = require('node-fetch');
var DataLoader = require('dataloader')

var publisherLoader = new DataLoader(keys => fetchPublishers(keys));

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
  name: 'PublisherSession',
  fields: () => ({
    gid:       globalIdField('PublisherSession'),
    id: {
      type: GraphQLString,
      description: 'The wayf id of the session.',
    },
    localId: {
      type: GraphQLString,
      description: 'The local id of the session.',
    },
    device: {
      type: DeviceType
    },
    identityProvider: {
      type: IdentityProviderType
    },
    publisher: {
      type: PublisherType,
        resolve: (publisherSession) => {
          var publisherId = publisherSession.publisher.id;


          return publisherId? publisherLoader.load(publisherId) : null;
      }
    },
    lastActiveDate: {
      type: DateType
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

var PublisherType = new GraphQLObjectType( {
  name: 'PublisherType',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    createdDate: {
      type: DateType
    },
    modifiedDate: {
      type: DateType
    }
  })
})

var IdentityProviderType = new GraphQLObjectType({
  name: 'IdentityProviderType',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    federationId: {
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



export class User {
  constructor(secretDeviceId) {
    this.secretDeviceId = secretDeviceId;
  }
}
const viewer = new User('c1c08c23-8a19-4fb6-a95c-a5fd8680b8ab');

function getViewer() {
  return new User('c1c08c23-8a19-4fb6-a95c-a5fd8680b8ab');
}

// The root provides a resolver function for each API endpoint
const ViewerType = new GraphQLObjectType({
    name: 'viewer',
    fields: {
      publisherSession: {
        type: PublisherSessionType,
        args: {
          id: { type: GraphQLString }
        },
        //resolve: (root, args) => fetchPublisherSession(args.id)
        resolve: (root, args) => fetchPublisherSession('c1c08c23-8a19-4fb6-a95c-a5fd8680b8ab')
      },
      publisherSessions: {
        name: 'publisherSessions',
        type: new GraphQLList(PublisherSessionType),
        resolve: (root, args) => fetchPublisherSessions(root.secretDeviceId)
      },
      device: {
        type: DeviceType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => fetchDevice(root.secretDeviceId)
      },
      identityProvider: {
        type: IdentityProviderType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => fetchIdentityProvider(args.id)
      },
      publisher: {
        type: PublisherType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => fetchPublisher(args.id)
      }
    }
  });


export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      viewer: {
        type: ViewerType,
        resolve: () => getViewer()
      }
    }
  })
});

const BASE_URL = 'http://localhost:8080';

function fetchResponseByURL(relativeURL) {
  console.log(relativeURL);

  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPublisherSession(id) {
  console.log(`fetching publisher session ${id}`);

  return fetchResponseByURL(`/1/publisherSessions/${id}`);
}

function fetchPublisherSessions(deviceId) {
  console.log(`fetching publisher session ${deviceId}`);

  return fetchResponseByURL(`/1/publisherSessions?device.id=${deviceId}`);
}

function fetchDevice(id) {

  console.log(`fetching device ${id}`);

  return fetchResponseByURL(`/1/device/${id}`);
}

function fetchIdentityProvider(id) {
  console.log(`fetching identity provider ${id}`);

  return fetchResponseByURL(`/1/identityProvider/${id}`);
}

function fetchPublisher(id) {
  console.log(`fetching publisher ${id}`);

  return fetchResponseByURL(`/1/publisher/${id}`);
}

function fetchPublishers(id) {
  console.log(`fetching publishers ${id}`);

  return fetchResponseByURL(`/1/publishers?id=${id}`);
}



