'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compat = require('react-relay/compat');

var mutation = {
    modern: function modern() {
        return require('./__generated__/ForgetIdpMutation.graphql');
    },
    classic: function classic() {
        var RelayQL_GENERATED = require('react-relay/classic').QL;

        return {
            kind: 'OperationDefinition',
            argumentDefinitions: [{
                defaultValue: null,
                kind: 'LocalArgument',
                name: 'input'
            }],
            name: 'ForgetIdpMutation',
            operation: 'mutation',
            node: function () {
                return {
                    calls: [{
                        kind: 'Call',
                        metadata: {},
                        name: 'forgetIdp',
                        value: {
                            kind: 'CallVariable',
                            callVariableName: 'input'
                        }
                    }],
                    children: [{
                        children: [{
                            children: [{
                                fieldName: 'globalId',
                                kind: 'Field',
                                metadata: {},
                                type: 'String'
                            }],
                            fieldName: 'device',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true
                            },
                            type: 'DeviceType'
                        }],
                        fieldName: 'viewer',
                        kind: 'Field',
                        metadata: {
                            canHaveSubselections: true
                        },
                        type: 'viewer'
                    }, {
                        fieldName: 'clientMutationId',
                        kind: 'Field',
                        metadata: {
                            isGenerated: true,
                            isRequisite: true
                        },
                        type: 'String'
                    }],
                    kind: 'Mutation',
                    metadata: {
                        inputType: 'ForgetIdpInput!'
                    },
                    name: 'ForgetIdpMutation',
                    responseType: 'ForgetIdpPayload'
                };
            }()
        };
    }
};

function getConfigs(viewerId) {
    return [{
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: viewerId,
        connectionName: 'features',
        edgeName: 'featureEdge',
        rangeBehaviors: {
            '': 'append'
        }
    }];
}

function getOptimisticResponse(idpId, viewerId) {
    return {
        forgetIdp: {
            viewer: {
                device: {
                    globalId: viewerId
                }
            }
        }
    };
}

function commit(environment, idpId, viewerId) {
    (0, _compat.commitMutation)(environment, {
        mutation: mutation,
        variables: { input: idpId },
        optimisticResponse: function optimisticResponse() {
            return getOptimisticResponse(idpId, viewerId);
        },
        configs: getConfigs(viewerId)
    });
}

var _default = { commit: commit };
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(mutation, 'mutation', 'js/components/ForgetIdpMutation.js');

    __REACT_HOT_LOADER__.register(getConfigs, 'getConfigs', 'js/components/ForgetIdpMutation.js');

    __REACT_HOT_LOADER__.register(getOptimisticResponse, 'getOptimisticResponse', 'js/components/ForgetIdpMutation.js');

    __REACT_HOT_LOADER__.register(commit, 'commit', 'js/components/ForgetIdpMutation.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/ForgetIdpMutation.js');
}();

;