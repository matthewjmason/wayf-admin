'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

require('../node_modules/react-mdl/extra/material');

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootNode = document.createElement('div');

document.body.appendChild(rootNode);

var render = function render(Component) {
    _reactDom2.default.render(_react2.default.createElement(
        _reactHotLoader.AppContainer,
        null,
        _react2.default.createElement(Component, null)
    ), rootNode);
};

render(_root2.default);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./root', function () {
        render(_root2.default);
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(rootNode, 'rootNode', 'js/app.js');

    __REACT_HOT_LOADER__.register(render, 'render', 'js/app.js');
}();

;