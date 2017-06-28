'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compat = require('react-relay/compat');

var _AppComponent = require('./AppComponent');

var _AppComponent2 = _interopRequireDefault(_AppComponent);

var _DeviceHeaderContainer = require('./DeviceHeaderContainer');

var _DeviceHeaderContainer2 = _interopRequireDefault(_DeviceHeaderContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _compat.createFragmentContainer)(_AppComponent2.default, {
    viewer: {
        modern: function modern() {
            return require('./__generated__/AppContainer_viewer.graphql');
        },
        classic: function classic() {
            var RelayQL_GENERATED = require('react-relay/classic').QL,
                DeviceHeader_viewer = _DeviceHeaderContainer2.default.getFragment('viewer');

            return {
                kind: 'FragmentDefinition',
                argumentDefinitions: [],
                node: function () {
                    return {
                        children: [].concat.apply([], [{
                            children: [{
                                alias: 'key',
                                children: [{
                                    fieldName: 'name',
                                    kind: 'Field',
                                    metadata: {},
                                    type: 'String'
                                }, {
                                    fieldName: 'id',
                                    kind: 'Field',
                                    metadata: {
                                        isGenerated: true,
                                        isRequisite: true
                                    },
                                    type: 'String'
                                }],
                                fieldName: 'idp',
                                kind: 'Field',
                                metadata: {
                                    canHaveSubselections: true
                                },
                                type: 'IdentityProviderType'
                            }, {
                                children: [{
                                    fieldName: 'name',
                                    kind: 'Field',
                                    metadata: {},
                                    type: 'String'
                                }, {
                                    fieldName: 'type',
                                    kind: 'Field',
                                    metadata: {},
                                    type: 'IdentityProviderTypeEnum'
                                }, {
                                    fieldName: 'id',
                                    kind: 'Field',
                                    metadata: {
                                        isGenerated: true,
                                        isRequisite: true
                                    },
                                    type: 'String'
                                }],
                                fieldName: 'idp',
                                kind: 'Field',
                                metadata: {
                                    canHaveSubselections: true
                                },
                                type: 'IdentityProviderType'
                            }, {
                                fieldName: 'lastActiveDate',
                                kind: 'Field',
                                metadata: {},
                                type: 'Date'
                            }],
                            fieldName: 'history',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true,
                                isPlural: true
                            },
                            type: 'IdentityProviderUsageType'
                        }, RelayQL_GENERATED.__frag(DeviceHeader_viewer)]),
                        id: RelayQL_GENERATED.__id(),
                        kind: 'Fragment',
                        metadata: {},
                        name: 'AppContainer_viewer',
                        type: 'viewer'
                    };
                }()
            };
        }
    }
});

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/AppContainer.js');
}();

;