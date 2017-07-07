'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ViewerQuery = require('./ViewerQuery');

var _ViewerQuery2 = _interopRequireDefault(_ViewerQuery);

var _AppContainer = require('../components/AppContainer');

var _AppContainer2 = _interopRequireDefault(_AppContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _AppContainer2.default, queries: _ViewerQuery2.default },
    _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '/' })
);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/routes/Route.js');
}();

;