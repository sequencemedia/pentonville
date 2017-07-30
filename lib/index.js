'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _array = require('./array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var SELECTOR = '\n/*\n * Implicit "tabindex"\n */\ninput:not([tabindex^=\'-\']):not(:disabled),\nselect:not([tabindex^=\'-\']):not(:disabled),\ntextarea:not([tabindex^=\'-\']):not(:disabled),\nbutton:not([tabindex^=\'-\']):not(:disabled),\nobject:not([tabindex^=\'-\']):not(:disabled)\na[href]:not([tabindex^=\'-\']),\n/*\n *  Explicit "tabindex"\n */\n*[tabindex]:not([tabindex^=\'-\']):not(:disabled)\n';

var isKeyTab = function isKeyTab(_ref) {
  var key = _ref.key;
  return key === 'Tab';
};

var getAlpha = function getAlpha(_ref2) {
  var _ref3 = _slicedToArray(_ref2, 1),
      alpha = _ref3[0];

  return alpha;
};
var getOmega = function getOmega(_ref4) {
  var _ref5 = _toArray(_ref4),
      nodeList = _ref5.slice(0);

  return nodeList.pop();
};
var getDelta = function getDelta(delta, nodeList) {
  var i = nodeList.findIndex(function (node) {
    return node === delta;
  }) + 1;
  var n = i === nodeList.length ? 0 : i;
  return nodeList[n];
};

var isAlpha = function isAlpha(node, nodeList) {
  return node === getAlpha(nodeList);
};

var isOmega = function isOmega(node, nodeList) {
  return node === getOmega(nodeList);
};

var Pentonville = function (_Component) {
  _inherits(Pentonville, _Component);

  function Pentonville() {
    var _ref6;

    var _temp, _this, _ret;

    _classCallCheck(this, Pentonville);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref6 = Pentonville.__proto__ || Object.getPrototypeOf(Pentonville)).call.apply(_ref6, [this].concat(args))), _this), _this.setPentonville = function (pentonville) {
      return pentonville ? !!(_this.pentonville = pentonville) : delete _this.pentonville;
    }, _this.getPentonville = function () {
      return _this.pentonville;
    }, _this.onKeyDown = function (event) {
      if (isKeyTab(event)) {
        var nodeList = _this.getNodeListArray();

        event.stopPropagation();

        if (nodeList.length) {
          var DELTA = event.target;


          event.preventDefault();

          if (isOmega(DELTA, nodeList)) {
            var alpha = getAlpha(nodeList);

            _this.retainFocus(alpha);
          } else {
            var delta = getDelta(DELTA, nodeList);

            _this.retainFocus(delta);
          }
        }
      }
    }, _this.onKeyUp = function (event) {
      if (isKeyTab(event)) {
        event.stopPropagation();
      }
    }, _this.onFocus = function (event) {
      event.stopPropagation();

      var DELTA = event.target;


      if (_this.hasNodeListMatch(DELTA)) {
        return;
      } else {
        var nodeList = _this.getNodeListArray();

        if (nodeList.length) {
          var alpha = getAlpha(nodeList);

          _this.retainFocus(alpha);
        }
      }
    }, _this.onBlur = function (event) {
      event.stopPropagation();

      var DELTA = event.relatedTarget;


      if (_this.hasNodeListMatch(DELTA)) {
        // relatedTarget can be null
        return;
      } else {
        var _DELTA = event.target;


        _this.retainFocus(_DELTA);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pentonville, [{
    key: 'hasNodeListMatch',
    value: function hasNodeListMatch(element) {
      // a null element returns false from 'contains'
      return this.getPentonville().contains(element) && element.matches(SELECTOR);
    }
  }, {
    key: 'queryForNodeList',
    value: function queryForNodeList() {
      return this.getPentonville().querySelectorAll(SELECTOR);
    }
  }, {
    key: 'getNodeListArray',
    value: function getNodeListArray() {
      var _this2 = this;

      return Array.from(this.queryForNodeList()).filter(function (e) {
        return (0, _array.filter)(e, _this2.getPentonville());
      }).map(_array.map).sort(_array.sort).reduce(_array.reduce, []);
    }
  }, {
    key: 'retainFocus',
    value: function retainFocus(node) {
      (node || this.getPentonville()).focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        'div',
        {
          className: 'pentonville',
          ref: this.setPentonville,
          onKeyDown: this.onKeyDown,
          onKeyUp: this.onKeyUp,
          onFocus: this.onFocus,
          onBlur: this.onBlur },
        children
      );
    }
  }]);

  return Pentonville;
}(_react.Component);

exports.default = Pentonville;


Pentonville.propTypes = {
  children: _propTypes2.default.element.isRequired
};