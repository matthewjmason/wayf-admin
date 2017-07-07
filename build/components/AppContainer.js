'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compat = require('react-relay/compat');

var _AppComponent = require('./AppComponent');

var _AppComponent2 = _interopRequireDefault(_AppComponent);

var _DeviceHeaderContainer = require('./DeviceHeaderContainer');

var _DeviceHeaderContainer2 = _interopRequireDefault(_DeviceHeaderContainer);

var _IdpHistoryContainer = require('./IdpHistoryContainer');

var _IdpHistoryContainer2 = _interopRequireDefault(_IdpHistoryContainer);

var _DeviceActivityContainer = require('./DeviceActivityContainer');

var _DeviceActivityContainer2 = _interopRequireDefault(_DeviceActivityContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _compat.createFragmentContainer)(_AppComponent2.default, {
    viewer: {
        modern: function modern() {
            return require('./__generated__/AppContainer_viewer.graphql');
        },
        classic: function classic() {
            var RelayQL_GENERATED = require('react-relay/classic').QL,
                DeviceHeader_viewer = _DeviceHeaderContainer2.default.getFragment('viewer'),
                IdpHistory_viewer = _IdpHistoryContainer2.default.getFragment('viewer'),
                DeviceActivity_viewer = _DeviceActivityContainer2.default.getFragment('viewer');

            return {
                kind: 'FragmentDefinition',
                argumentDefinitions: [],
                node: function () {
                    return {
                        children: [].concat.apply([], [RelayQL_GENERATED.__frag(DeviceHeader_viewer), RelayQL_GENERATED.__frag(IdpHistory_viewer), RelayQL_GENERATED.__frag(DeviceActivity_viewer)]),
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