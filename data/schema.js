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
    GraphQLInt,
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLScalarType,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull
} from 'graphql';

import {
    mutationWithClientMutationId,
    cursorForObjectInConnection
} from 'graphql-relay';

var fetch = require('node-fetch');
var DataLoader = require('dataloader')

var publisherLoader = new DataLoader(keys => fetchPublishers(keys));
var identityProviderLoader = new DataLoader(keys => fetchIdentityProviders(keys));

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

var DeviceAccessTypeEnum = new GraphQLEnumType({
    name: 'DeviceAccessTypeEnum',
    values: {
        REMOVE_IDP: {},
        READ_IDP_HISTORY: {},
        ADD_IDP : {}
    }
});

var IdentityProviderTypeEnum = new GraphQLEnumType({
    name: 'IdentityProviderTypeEnum',
    values: {
        SAML: {},
        OAUTH: {},
        OPEN_ATHENS : {}
    }
});

var DeviceAccessType = new GraphQLObjectType({
    name: 'DeviceAccessType',
    fields: () => ({
        localId: {
            type: GraphQLString
        },
        device: {
            type: DeviceType
        },
        identityProvider: {
            type: IdentityProviderType,
            resolve: (deviceAccess) => {
                var idp = deviceAccess.identityProvider;
                var idpId = idp? idp.id : null;

                return idpId ? identityProviderLoader.load(idpId) : null;
            }
        },
        publisher: {
            type: PublisherType,
            resolve: (deviceAccess) => {
                var publisher = deviceAccess.publisher;
                var publisherId = publisher? publisher.id : null;

                return publisherId ? publisherLoader.load(publisherId) : null;
            }
        },
        type: {
            type: DeviceAccessTypeEnum
        },
        createdDate: {
            type: DateType
        },
        modifiedDate: {
            type: DateType
        }
    })
});

var IdentityProviderUsageType = new GraphQLObjectType( {
    name: 'IdentityProviderUsageType',
    fields: () => ({
        lastActiveDate: {
            type: DateType
        },
        frequency: {
            type: GraphQLFloat
        },
        idp: {
            type: IdentityProviderType
        }
    })
});

var DeviceType = new GraphQLObjectType({
    name: 'DeviceType',
    fields: () => ({
        globalId: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        info: {
            type: DeviceInfoType
        },
        history: {
            type: new GraphQLList(IdentityProviderUsageType)
        },
        activity: {
            type: new GraphQLList(DeviceAccessType),
            resolve: (device) => {
                var globalId = device.globalId;

                return globalId ? fetchActivity(globalId) : null;
            }
        },
        createdDate: {
            type: DateType
        },
        modifiedDate: {
            type: DateType
        }
    })
});

var DeviceInfoType = new GraphQLObjectType({
    name: 'DeviceInfoType',
    fields: () => ({
        userAgent: {
            type: GraphQLString
        }
    })
});

var PublisherType = new GraphQLObjectType({
    name: 'PublisherType',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        code: {
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
});

var IdentityProviderType = new GraphQLObjectType({
    name: 'IdentityProviderType',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        type: {
            type: IdentityProviderTypeEnum
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
});


export class User {
    constructor(secretDeviceId) {
        this.secretDeviceId = secretDeviceId;
    }
}
const viewer = new User('baedb88c-af67-47b1-96da-940fd3643f2c');

function getViewer() {
    return new User('baedb88c-af67-47b1-96da-940fd3643f2c');
}

// The root provides a resolver function for each API endpoint
const ViewerType = new GraphQLObjectType({
    name: 'viewer',
    fields: {
        device: {
            type: DeviceType,
            args: {
                globalId: {type: GraphQLString}
            },
            resolve: (root, args) => fetchDevice(root.secretDeviceId)
        },
        identityProvider: {
            type: IdentityProviderType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (root, args) => fetchIdentityProvider(args.id)
        },
        publisher: {
            type: PublisherType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (root, args) => fetchPublisher(args.id)
        },
        history: {
            type: new GraphQLList(IdentityProviderUsageType),
            args: {
                globalId: {type: GraphQLString}
            },
            resolve: (root, args) => fetchHistory(root.secretDeviceId)
        },
        latestActivity: {
            type: DeviceAccessType,
            args: {
                globalId: {type: GraphQLString}
            },
            resolve: (root, args) => fetchLatestActivity(root.secretDeviceId)
        },
        identityProvider: {
            type: IdentityProviderType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (root, args) => fetchIdentityProvider(args.id)
        }
    }
});


const forgetIdpMutation = mutationWithClientMutationId({
    name: 'ForgetIdp',
    inputFields: {
        idpId: { type: new GraphQLNonNull(GraphQLInt) }
    },

    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer()
        }
    },

    mutateAndGetPayload: ({idpId}) => forgetIdp(idpId)
});


const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        forgetIdp: forgetIdpMutation
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        // Add your own root fields here
        viewer: {
            type: ViewerType,
            resolve: () => getViewer()
        }
    })
});


export default new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

const BASE_URL = 'http://localhost:8080';

function fetchResponseByURL(relativeURL) {
    console.log(relativeURL);

    return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function deleteByURLAndHeader(relativeURL, header) {
    console.log(relativeURL, header);

    return fetch(`${BASE_URL}${relativeURL}`, {headers: header, method: 'delete'}).then(res => res.json());
}

function fetchResponseByURLAndHeader(relativeURL, header) {
    console.log(relativeURL, header);

    return fetch(`${BASE_URL}${relativeURL}`, {headers: header}).then(res => res.json());
}

function fetchDevice(id) {
    console.log(`fetching device ${id}`);

    return fetchResponseByURL(`/1/device/${id}`);
}

function fetchIdentityProvider(id) {
    console.log(`fetching identity provider ${id}`);

    return fetchResponseByURL(`/1/identityProvider/${id}`);
}

function fetchIdentityProviders(ids) {
    console.log(`fetching identity provider ${ids}`);

    return fetchResponseByURL(`/1/identityProviders?ids=${ids}`);
}

function fetchPublisher(id) {
    console.log(`fetching publisher ${id}`);

    return fetchResponseByURL(`/1/publisher/${id}`);
}

function fetchPublishers(id) {
    console.log(`fetching publishers ${id}`);

    return fetchResponseByURL(`/1/publishers?ids=${id}`);
}

function fetchActivity(id) {
    console.log(`fetching activity ${id}`);

    return fetchResponseByURL(`/1/device/${id}/activity`);
}

function fetchLatestActivity(id) {
    console.log(`fetching latest activity ${id}`);

    return fetchResponseByURL(`/1/device/${id}/activity?limit=1&type=ADD_IDP`)
        .then(function(res) {
            var activity = res;

            return activity[0];
        });
}

function fetchHistory(id) {
    console.log(`fetching activity ${id}`);

    return fetchResponseByURLAndHeader(`/1/mydevice/history`, {'X-Device-Id': getViewer().secretDeviceId});
}

function forgetIdp(idpId) {
    console.log(`forgetting idp ${idpId}`);

    return deleteByURLAndHeader(`/1/mydevice/history/idp/${idpId}`, {'X-Device-Id': getViewer().secretDeviceId}).then((function (res) {
        return getViewer();
    }));
}