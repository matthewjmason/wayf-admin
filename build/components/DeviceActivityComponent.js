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

var _reactBootstrap = require('react-bootstrap');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
    DeviceActivity: {
        displayName: 'DeviceActivity'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'js/components/DeviceActivityComponent.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'js/components/DeviceActivityComponent.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var DeviceActivity = _wrapComponent('DeviceActivity')((_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(DeviceActivity, _React$Component);

    function DeviceActivity(props) {
        (0, _classCallCheck3.default)(this, DeviceActivity);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceActivity.__proto__ || Object.getPrototypeOf(DeviceActivity)).call(this, props));

        _this.sessionRows = _this.sessionRows.bind(_this);
        _this.getDisplayName = _this.getDisplayName.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(DeviceActivity, [{
        key: 'sessionRows',
        value: function sessionRows(device) {
            var _this2 = this;

            if (!device || !device.activity) {
                return;
            }
            return device.activity.map(function (access, i) {
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
                        _this2.getDisplayName(access.type)
                    )
                );
            });
        }
    }, {
        key: 'getDisplayName',
        value: function getDisplayName(accessType) {
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
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _reactBootstrap.Grid,
                null,
                this.sessionRows(this.props.viewer.device)
            );
        }
    }]);
    return DeviceActivity;
}(_react3.default.Component), _class.propTypes = {
    viewer: _propTypes2.default.object.isRequired
}, _temp));

var _default = DeviceActivity;
exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DeviceActivity, 'DeviceActivity', 'js/components/DeviceActivityComponent.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/DeviceActivityComponent.js');
}();

;