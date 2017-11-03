'use strict';

exports.__esModule = true;
exports.getBackgroundElementStyles = exports.getLabelStyles = exports.getContainerStyles = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('./styles/index.css');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Generates two linear gradients based on the status and using the given color
 * @private
 * @param {Number} status Number from 0 to 100 representing the status
 * @param {String} color Color for the progress part
 * @return {String} The two gradients
 */
var getGradients = function getGradients(status, color, backgroundColor) {
  var gradients = void 0;

  if (status < 50) {
    gradients = '\n      linear-gradient(\n        90deg,\n        ' + backgroundColor + ' 50%,\n        transparent 50%,\n        transparent\n      ),\n      linear-gradient(\n        ' + Math.round(90 + 3.6 * status) + 'deg,\n        ' + color + ' 50%,\n        ' + backgroundColor + ' 50%,\n        ' + backgroundColor + '\n      )\n    ';
  } else {
    gradients = '\n      linear-gradient(\n        ' + Math.round(-90 + 3.6 * (status - 50)) + 'deg,\n        ' + color + ' 50%,\n        transparent 50%,\n        transparent\n      ),\n      linear-gradient(\n        270deg,\n        ' + color + ' 50%,\n        ' + backgroundColor + ' 50%,\n        ' + backgroundColor + '\n      )\n    ';
  }

  return gradients;
};

/**
 * Creates the inline styles needed on the main container
 * @public
 * @param {Number} status Number from 0 to 100 representing the status
 * @param {Number} size The width and height of the main container
 * @param {String} color Color for the progress part
 * @return {String} A map with all relevant CSS properties and values
 */
var getContainerStyles = exports.getContainerStyles = function getContainerStyles(status, size, color, backgroundColor) {
  return {
    color: color,
    backgroundColor: backgroundColor,
    width: size + 'px',
    height: size + 'px',
    'backgroundImage': getGradients(status, color, backgroundColor)
  };
};

/**
 * Creates the inline styles needed on the label
 * @public
 * @param {String} labelColor The color of the label
 * @param {String} fontSize The font-size of the label
 * @param {Number} size The width and height of the main container
 * @return {String} A map with all relevant CSS properties and values
 */
var getLabelStyles = exports.getLabelStyles = function getLabelStyles(backgroundColor, color, fontSize, size) {
  return {
    color: '' + color,
    'fontSize': '' + fontSize,
    'marginLeft': 0.2 * size + 'px',
    'marginTop': 0.2 * size + 'px',
    'lineHeight': 0.6 * size + 'px',
    height: 0.6 * size + 'px',
    width: 0.6 * size + 'px',
    background: '' + backgroundColor,
    'boxShadow': '0px 0px 1px 8px ' + backgroundColor

  };
};

/**
 * Creates the inline styles needed on background element
 * @public
 * @param {Number} size The width and height of the main container
 * @param {String} backgroundColor The background color
 * @return {String} A map with all relevant CSS properties and values
 */
var getBackgroundElementStyles = exports.getBackgroundElementStyles = function getBackgroundElementStyles(size, backgroundColor, parentColor) {
  return {
    backgroundColor: backgroundColor,
    'boxShadow': 'inset 0px 0px 130px ' + parentColor,
    'height': size + 'px',
    'width': size + 'px',
    'position': 'absolute',
    'left': '0',
    'top': '0',
    'opacity': '0.15',
    'borderRadius': '50%',
    'display': 'block',
    'content': ' ',
    'zIndex': '1'
  };
};

var Rpc = function (_React$Component) {
  _inherits(Rpc, _React$Component);

  function Rpc(props) {
    _classCallCheck(this, Rpc);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { status: 0 };
    return _this;
  }

  Rpc.displayLabelContent = function displayLabelContent(value, template) {
    return template.replace('%s', value);
  };

  Rpc.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this.setState({ status: this.props.status });
  };

  Rpc.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this._isMounted && nextProps.status && nextProps.status !== this.state.status) {
      this.setState({
        status: nextProps.status
      });
    }
  };

  Rpc.prototype.render = function render() {
    var _props = this.props,
        parentBackgroundColor = _props.parentBackgroundColor,
        parentColor = _props.parentColor,
        size = _props.size,
        labelTemp = _props.labelTemp,
        labelColor = _props.labelColor,
        labelSize = _props.labelSize,
        labelBackgroundColor = _props.labelBackgroundColor,
        backgroundColor = _props.backgroundColor;


    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'progress', role: 'progressbar', style: getContainerStyles(this.state.status, size, parentColor, parentBackgroundColor) },
        _react2.default.createElement(
          'span',
          { style: getLabelStyles(labelBackgroundColor, labelColor, labelSize, size) },
          Rpc.displayLabelContent(this.state.status, labelTemp)
        ),
        _react2.default.createElement(
          'div',
          { style: getBackgroundElementStyles(size, backgroundColor, parentColor) },
          ' '
        )
      )
    );
  };

  return Rpc;
}(_react2.default.Component);

Rpc.propTypes = {
  parentBackgroundColor: _propTypes2.default.string,
  backgroundColor: _propTypes2.default.string,
  parentColor: _propTypes2.default.string,
  label: _propTypes2.default.string,
  labelColor: _propTypes2.default.string,
  labelSize: _propTypes2.default.string,
  size: _propTypes2.default.number,
  status: _propTypes2.default.number.isRequired
};
Rpc.defaultProps = {
  parentBackgroundColor: '#272822',
  parentColor: '#1724d2',
  size: 100,
  labelTemp: '%s%',
  labelColor: '#fff',
  labelBackgroundColor: '#272822',
  labelSize: '16px',
  backgroundColor: '#f7f2f2'
};
exports.default = Rpc;