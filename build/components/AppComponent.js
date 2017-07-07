'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _reactRelay = require('react-relay');

var _DeviceHeaderContainer = require('./DeviceHeaderContainer');

var _DeviceHeaderContainer2 = _interopRequireDefault(_DeviceHeaderContainer);

var _IdpHistoryComponent = require('./IdpHistoryComponent');

var _IdpHistoryComponent2 = _interopRequireDefault(_IdpHistoryComponent);

var _DeviceActivityComponent = require('./DeviceActivityComponent');

var _DeviceActivityComponent2 = _interopRequireDefault(_DeviceActivityComponent);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
    App: {
        displayName: 'App'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'js/components/AppComponent.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'js/components/AppComponent.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var App = _wrapComponent('App')(function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            // Takes active tab from props if it is defined there
            activeTab: props.activeTab || 1
        };

        // Bind the handleSelect function already here (not in the render function)
        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(App, [{
        key: 'handleSelect',
        value: function handleSelect(selectedTab) {
            // The active tab must be set into the state so that
            // the Tabs component knows about the change and re-renders.
            this.setState({
                activeTab: selectedTab
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _reactBootstrap.Grid,
                null,
                _react3.default.createElement(_DeviceHeaderContainer2.default, { viewer: this.props.viewer }),
                _react3.default.createElement(
                    _reactBootstrap.Row,
                    { className: 'row-fluid' },
                    _react3.default.createElement(
                        _reactBootstrap.Col,
                        { md: 12 },
                        _react3.default.createElement(
                            _reactBootstrap.Tabs,
                            { activeKey: this.state.activeTab, onSelect: this.handleSelect },
                            _react3.default.createElement(
                                _reactBootstrap.Tab,
                                { eventKey: 1, title: 'Overview' },
                                _react3.default.createElement(_IdpHistoryComponent2.default, { relay: this.props.relay, viewer: this.props.viewer })
                            ),
                            _react3.default.createElement(
                                _reactBootstrap.Tab,
                                { eventKey: 2, title: 'Activity' },
                                _react3.default.createElement(_DeviceActivityComponent2.default, { viewer: this.props.viewer })
                            )
                        )
                    )
                )
            );
        }
    }]);
    return App;
}(_react3.default.Component));

var _default = App;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(App, 'App', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/AppComponent.js');
}();

;