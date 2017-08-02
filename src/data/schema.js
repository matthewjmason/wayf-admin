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
    GraphQLNonNull
} from 'graphql';

import {
    fetchActivity,
    fetchDevice,
    fetchIdentityProvider,
    fetchPublisher,
    fetchHistory,
    fetchLatestActivity,
    forgetIdp,
    publisherLoader,
    identityProviderLoader,
    userLoader,
    getViewer,
    createPublisherRegistration,
    fetchPendingRegistrations,
    fetchApprovedRegistrations,
    fetchDeniedRegistrations,
    getAdminViewer,
    denyPublisherRegistration
} from './database';

import {
    mutationWithClientMutationId
} from 'graphql-relay';

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


var UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        phoneNumber: {
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


var PublisherRegistrationType = new GraphQLObjectType({
    name: 'PublisherRegistrationType',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        status : {
            type: GraphQLString
        },
        publisherName: {
            type: GraphQLString
        },
        contact: {
            type: UserType,
            resolve: (root) => userLoader.load(root.contact.id)
        },
        applicationDate: {
            type: DateType
        },
        approvalDate: {
            type: DateType
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


// The root provides a resolver function for each API endpoint
const ViewerType = new GraphQLObjectType({
    name: 'viewer',
    fields: {
        viewerId: {
            type: GraphQLString
        },
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
            resolve: (root, args) => root.secretDeviceId? fetchHistory(root.secretDeviceId) : null
        },
        latestActivity: {
            type: DeviceAccessType,
            args: {
                globalId: {type: GraphQLString}
            },
            resolve: (root, args) => root.secretDeviceId? fetchLatestActivity(root.secretDeviceId) : null
        },
        identityProvider: {
            type: IdentityProviderType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (root, args) => fetchIdentityProvider(args.id)
        },
        pendingPublisherRegistrations: {
            type: new GraphQLList(PublisherRegistrationType),
            resolve: (root, args) => fetchPendingRegistrations()
        },
        approvedPublisherRegistrations: {
            type: new GraphQLList(PublisherRegistrationType),
            resolve: (root, args) => fetchApprovedRegistrations()
        },
        deniedPublisherRegistrations: {
            type: new GraphQLList(PublisherRegistrationType),
            resolve: (root, args) => fetchDeniedRegistrations()
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
            type: ViewerType
        }
    },

    mutateAndGetPayload: ({idpId}, root) => {
        return forgetIdp(idpId, root.session.deviceId);
    }
});

const denyPublisherRegistrationMutation = mutationWithClientMutationId({
    name: 'DenyPublisherRegistration',
    inputFields: {
        publisherRegistrationId: { type: new GraphQLNonNull(GraphQLInt) }
    },

    outputFields: {
        publisherRegistration: {
            type: PublisherRegistrationType
        }
    },

    mutateAndGetPayload: ({publisherRegistrationId}, root) => {
        return denyPublisherRegistration(publisherRegistrationId);
    }
});

const createPublisherRegistrationMutation = mutationWithClientMutationId({
    name: 'CreatePublisherRegistration',
    inputFields: {
        publisherName: { type: new GraphQLNonNull(GraphQLString) },
        contactFirstName: { type: new GraphQLNonNull(GraphQLString) },
        contactLastName: { type: new GraphQLNonNull(GraphQLString) },
        contactEmail: { type: new GraphQLNonNull(GraphQLString) },
        contactPhoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
        publisherRegistration: {
            type: PublisherRegistrationType,
            resolve: (root, args) => root
        },
    },
    mutateAndGetPayload: ({publisherName, contactFirstName, contactLastName, contactEmail, contactPhoneNumber}, root) => {
        var publisherRegistration = {
            "publisherName" : publisherName,
            "contact" : {
                "firstName" : contactFirstName,
                "lastName" : contactLastName,
                "email" : contactEmail,
                "phoneNumber" : contactPhoneNumber
            }
        };

        return createPublisherRegistration(publisherRegistration);
    }
});


const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        forgetIdp: forgetIdpMutation,
        createPublisherRegistration: createPublisherRegistrationMutation,
        denyPublisherRegistration: denyPublisherRegistrationMutation
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        // Add your own root fields here
        viewer: {
            type: ViewerType,
            resolve: (parentValue, args, request) => {
                if (request.session.deviceId) {
                    return getViewer(request.session.deviceId);
                } else {
                    return getViewer(null);
                }
            }
        },
        publisherRegistration: {
            type: PublisherRegistrationType,
        }
    })
});


export default new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
