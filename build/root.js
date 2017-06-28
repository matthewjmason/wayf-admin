'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classic = require('react-relay/classic');

var _classic2 = _interopRequireDefault(_classic);

var _reactRouter = require('react-router');

var _reactRouterRelay = require('react-router-relay');

var _reactRouterRelay2 = _interopRequireDefault(_reactRouterRelay);

var _Route = require('./routes/Route');

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function Root() {
    return _react2.default.createElement(_reactRouter.Router, {
        history: _reactRouter.browserHistory,
        routes: _Route2.default,
        render: (0, _reactRouter.applyRouterMiddleware)(_reactRouterRelay2.default),
        environment: _classic2.default.Store
    });
};

var _default = Root;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Root, 'Root', 'js/root.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/root.js');
}();

;