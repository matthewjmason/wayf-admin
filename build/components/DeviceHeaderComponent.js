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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
    DeviceHeader: {
        displayName: 'DeviceHeader'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'js/components/DeviceHeaderComponent.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'js/components/DeviceHeaderComponent.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var classNames = require('classnames');

var DeviceHeader = _wrapComponent('DeviceHeader')((_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(DeviceHeader, _React$Component);

    function DeviceHeader() {
        (0, _classCallCheck3.default)(this, DeviceHeader);
        return (0, _possibleConstructorReturn3.default)(this, (DeviceHeader.__proto__ || Object.getPrototypeOf(DeviceHeader)).apply(this, arguments));
    }

    (0, _createClass3.default)(DeviceHeader, [{
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _reactBootstrap.Row,
                { className: 'row-fluid' },
                _react3.default.createElement(
                    _reactBootstrap.Grid,
                    null,
                    _react3.default.createElement(
                        _reactBootstrap.Row,
                        null,
                        _react3.default.createElement(
                            _reactBootstrap.Col,
                            { md: 12 },
                            _react3.default.createElement(
                                _reactBootstrap.PageHeader,
                                null,
                                this.props.viewer.device.info.userAgent
                            )
                        )
                    ),
                    _react3.default.createElement(
                        _reactBootstrap.Row,
                        null,
                        _react3.default.createElement(
                            _reactBootstrap.Col,
                            { md: 12 },
                            _react3.default.createElement(
                                _reactBootstrap.Label,
                                { bsStyle: 'success' },
                                '\xA0'
                            ),
                            '\xA0Last seen ',
                            this.props.viewer.latestActivity.createdDate,
                            ' at ',
                            this.props.viewer.latestActivity.publisher.name
                        )
                    )
                )
            );
        }
    }]);
    return DeviceHeader;
}(_react3.default.Component), _class.propTypes = {
    viewer: _propTypes2.default.object.isRequired
}, _temp));

var _default = DeviceHeader;
exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DeviceHeader, 'DeviceHeader', 'js/components/DeviceHeaderComponent.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/DeviceHeaderComponent.js');
}();

;