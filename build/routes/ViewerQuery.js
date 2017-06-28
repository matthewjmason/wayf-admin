'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classic = require('react-relay/classic');

var _classic2 = _interopRequireDefault(_classic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
    viewer: function viewer(Component) {
        return function (RQL_0) {
            return {
                children: [].concat.apply([], [_classic2.default.QL.__frag(RQL_0)]),
                fieldName: 'viewer',
                kind: 'Query',
                metadata: {},
                name: 'ViewerQuery',
                type: 'viewer'
            };
        }(Component.getFragment('viewer'));
    }
};
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/routes/ViewerQuery.js');
}();

;