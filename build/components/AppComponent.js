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

var _ForgetIdpButtonComponent = require('./ForgetIdpButtonComponent');

var _ForgetIdpButtonComponent2 = _interopRequireDefault(_ForgetIdpButtonComponent);

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
} /**
   * This file provided by Facebook is for non-commercial testing and evaluation
   * purposes only.  Facebook reserves all rights not expressly granted.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
   * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
   * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
   * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

var classNames = require('classnames');

function sessionRow(activity) {

    return activity.map(function (access, i) {
        return _react3.default.createElement(
            _reactBootstrap.Row,
            null,
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 5 },
                (0, _moment2.default)(access.createdDate).format('LLL')
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 5 },
                access.publisher.name
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 2 },
                getDisplayName(access.type)
            )
        );
    });
}

function getDisplayName(accessType) {
    if ('REMOVE_IDP' === accessType) {
        return 'DELETE';
    } else if ('READ_IDP_HISTORY' === accessType) {
        return 'GET';
    } else if ('ADD_IDP' === accessType) {
        return 'SAVE';
    } else {
        return accessType;
    }
}

function summaryRow(props) {
    return props.viewer.history.map(function (usage, i) {
        return _react3.default.createElement(
            _reactBootstrap.Row,
            null,
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 3 },
                usage.idp.name
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 3 },
                usage.idp.type
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 2 },
                (0, _moment2.default)(usage.lastActiveDate).format('LLL')
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 2 },
                _react3.default.createElement(_ForgetIdpButtonComponent2.default, { relay: props.relay, viewer: props.viewer, idpId: usage.idp.id })
            )
        );
    });
}
function buttonClick(i) {
    console.log(i);
    alert(i);
}

function loadSummary(props) {

    return _react3.default.createElement(
        _reactBootstrap.Grid,
        null,
        _react3.default.createElement(
            _reactBootstrap.Row,
            { className: 'row-fluid' },
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 3 },
                _react3.default.createElement(
                    'h2',
                    null,
                    'Name'
                )
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 3 },
                _react3.default.createElement(
                    'h2',
                    null,
                    'Protocol'
                )
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 2 },
                _react3.default.createElement('h2', null)
            ),
            _react3.default.createElement(
                _reactBootstrap.Col,
                { md: 2 },
                _react3.default.createElement('h2', null)
            )
        ),
        summaryRow(props)
    );
}

function loadActivity(device) {

    return _react3.default.createElement(
        _reactBootstrap.Grid,
        null,
        sessionRow(device.activity)
    );
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
                                loadSummary(this.props)
                            ),
                            _react3.default.createElement(
                                _reactBootstrap.Tab,
                                { eventKey: 2, title: 'Activity' },
                                loadActivity(this.props.viewer.device)
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

    __REACT_HOT_LOADER__.register(sessionRow, 'sessionRow', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(getDisplayName, 'getDisplayName', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(summaryRow, 'summaryRow', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(buttonClick, 'buttonClick', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(loadSummary, 'loadSummary', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(loadActivity, 'loadActivity', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(App, 'App', 'js/components/AppComponent.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/AppComponent.js');
}();

;