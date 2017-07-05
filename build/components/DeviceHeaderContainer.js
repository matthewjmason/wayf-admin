'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compat = require('react-relay/compat');

var _DeviceHeaderComponent = require('./DeviceHeaderComponent');

var _DeviceHeaderComponent2 = _interopRequireDefault(_DeviceHeaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _compat.createFragmentContainer)(_DeviceHeaderComponent2.default, {
    viewer: {
        modern: function modern() {
            return require('./__generated__/DeviceHeaderContainer_viewer.graphql');
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
                                fieldName: 'globalId',
                                kind: 'Field',
                                metadata: {},
                                type: 'String'
                            }, {
                                children: [{
                                    fieldName: 'userAgent',
                                    kind: 'Field',
                                    metadata: {},
                                    type: 'String'
                                }],
                                fieldName: 'info',
                                kind: 'Field',
                                metadata: {
                                    canHaveSubselections: true
                                },
                                type: 'DeviceInfoType'
                            }],
                            fieldName: 'device',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true
                            },
                            type: 'DeviceType'
                        }, {
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
                                fieldName: 'createdDate',
                                kind: 'Field',
                                metadata: {},
                                type: 'Date'
                            }],
                            fieldName: 'latestActivity',
                            kind: 'Field',
                            metadata: {
                                canHaveSubselections: true
                            },
                            type: 'DeviceAccessType'
                        }],
                        id: RelayQL_GENERATED.__id(),
                        kind: 'Fragment',
                        metadata: {},
                        name: 'DeviceHeaderContainer_viewer',
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

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/DeviceHeaderContainer.js');
}();

;