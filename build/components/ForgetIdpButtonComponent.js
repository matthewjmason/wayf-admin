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

var _reactBootstrap = require('react-bootstrap');

var _ForgetIdpMutation = require('./ForgetIdpMutation');

var _ForgetIdpMutation2 = _interopRequireDefault(_ForgetIdpMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
    ForgetIdpButton: {
        displayName: 'ForgetIdpButton'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'js/components/ForgetIdpButtonComponent.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'js/components/ForgetIdpButtonComponent.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var ForgetIdpButton = _wrapComponent('ForgetIdpButton')(function (_React$Component) {
    (0, _inherits3.default)(ForgetIdpButton, _React$Component);

    function ForgetIdpButton(props) {
        (0, _classCallCheck3.default)(this, ForgetIdpButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ForgetIdpButton.__proto__ || Object.getPrototypeOf(ForgetIdpButton)).call(this, props));

        _this.state = { isLoading: false };

        _this.handleClick = _this.handleClick.bind(_this);

        return _this;
    }

    (0, _createClass3.default)(ForgetIdpButton, [{
        key: 'handleClick',
        value: function handleClick() {
            this.setState({ isLoading: true });

            _ForgetIdpMutation2.default.commit(this.props.relay.environment, { idpId: this.props.idpId }, this.props.viewer.id);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'danger', disabled: this.state.isLoading, onClick: this.handleClick },
                'Forget'
            );
        }
    }]);
    return ForgetIdpButton;
}(_react3.default.Component));

;

var _default = ForgetIdpButton;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ForgetIdpButton, 'ForgetIdpButton', 'js/components/ForgetIdpButtonComponent.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'js/components/ForgetIdpButtonComponent.js');
}();

;