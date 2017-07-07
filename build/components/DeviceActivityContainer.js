'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compat = require('react-relay/compat');

var _DeviceActivityComponent = require('./DeviceActivityComponent');

var _DeviceActivityComponent2 = _interopRequireDefault(_DeviceActivityComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _compat.createFragmentContainer)(_DeviceActivityComponent2.default, {
    viewer: {
        modern: function modern() {
            return require('./__generated__/DeviceActivityContainer_viewer.graphql');
        },
        classic: function classic() {
            var RelayQL_GENERATED = require('react-relay/classic').QL;

            return {
                kind: 'FragmentDefinition',
                argumentDefinitions: [],
                node: function () {
                    return {
                        children: [{
                            children: [{
                                children: [{
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
                                    fieldName: 'publisher',
                                    kind: 'Field',
                                    metadata: {
                                        canHaveSubselections: true
                                    },
                                    type: 'PublisherType'
                                }, {
                                    fieldName: 'type',
                                    kind: 'Field',
                                    metadata: {},
                                    type: 'DeviceAccessTypeEnum'
                                }, {
                                    fieldName: 'createdDate',
                                    kind: 'Field',
                                    metadata: {},
                                    type: 'Date'
                                }],
                                fieldName: 'activity',
                                kind: 'Field',
                                metadata: {
                                    canHaveSubselections: true,
                                    isPlural: true
                                },
                                type: 'DeviceAccessType'
                            }],
                            fieldName: 'device',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true
                            },
                            type: 'DeviceType'
                        }],
                        id: RelayQL_GENERATED.__id(),
                        kind: 'Fragment',
                        metadata: {},
                        name: 'DeviceActivityContainer_viewer',
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

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/DeviceActivityContainer.js');
}();

;