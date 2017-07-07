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

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ForgetIdpButtonComponent = require('./ForgetIdpButtonComponent');

var _ForgetIdpButtonComponent2 = _interopRequireDefault(_ForgetIdpButtonComponent);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
    IdpHistory: {
        displayName: 'IdpHistory'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'js/components/IdpHistoryComponent.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'js/components/IdpHistoryComponent.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var IdpHistory = _wrapComponent('IdpHistory')((_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(IdpHistory, _React$Component);

    function IdpHistory(props) {
        (0, _classCallCheck3.default)(this, IdpHistory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (IdpHistory.__proto__ || Object.getPrototypeOf(IdpHistory)).call(this, props));

        _this.summaryRow = _this.summaryRow.bind(_this);
        _this.loadSummary = _this.loadSummary.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(IdpHistory, [{
        key: 'summaryRow',
        value: function summaryRow(props) {
            if (!props.viewer.history) {
                return;
            }
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
    }, {
        key: 'loadSummary',
        value: function loadSummary(props) {
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
                this.summaryRow(props)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _reactBootstrap.Grid,
                null,
                this.loadSummary(this.props)
            );
        }
    }]);
    return IdpHistory;
}(_react3.default.Component), _class.propTypes = {
    viewer: _propTypes2.default.object.isRequired,
    relay: _propTypes2.default.object.isRequired
}, _temp));

var _default = IdpHistory;
exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(IdpHistory, 'IdpHistory', 'js/components/IdpHistoryComponent.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/IdpHistoryComponent.js');
}();

;