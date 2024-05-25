"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _array = require("./array");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
}; // eslint-disable-line

var isOmega = function isOmega(node, nodeList) {
  return node === getOmega(nodeList);
};
var Pentonville = exports.default = /*#__PURE__*/function (_Component) {
  function Pentonville() {
    var _this;
    _classCallCheck(this, Pentonville);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Pentonville, [].concat(args));
    _defineProperty(_this, "setPentonville", function (pentonville) {
      return pentonville ? !!(_this.pentonville = pentonville) : delete _this.pentonville;
    });
    _defineProperty(_this, "getPentonville", function () {
      return _this.pentonville;
    });
    _defineProperty(_this, "onKeyDown", function (event) {
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
    });
    _defineProperty(_this, "onKeyUp", function (event) {
      if (isKeyTab(event)) {
        event.stopPropagation();
      }
    });
    _defineProperty(_this, "onBlur", function (event) {
      event.stopPropagation();
      var DELTA = event.relatedTarget;
      if (!_this.canFocus(DELTA)) {
        // relatedTarget can be null
        var _DELTA = event.target;
        _this.retainFocus(_DELTA);
      }
    });
    _defineProperty(_this, "onFocus", function (event) {
      event.stopPropagation();
    });
    return _this;
  }
  _inherits(Pentonville, _Component);
  return _createClass(Pentonville, [{
    key: "inPentonville",
    value: function inPentonville(element) {
      // null returns false from 'contains'
      return this.getPentonville().contains(element);
    }
  }, {
    key: "canFocus",
    value: function canFocus(element) {
      return this.inPentonville(element) && element.matches(_constants.CANFOCUS);
    }
  }, {
    key: "hasNodeListMatch",
    value: function hasNodeListMatch(element) {
      return this.inPentonville(element) && element.matches(_constants.TABINDEX);
    }
  }, {
    key: "queryForNodeList",
    value: function queryForNodeList() {
      return this.getPentonville().querySelectorAll(_constants.TABINDEX);
    }
  }, {
    key: "getNodeListArray",
    value: function getNodeListArray() {
      var _this2 = this;
      return Array.from(this.queryForNodeList()).filter(function (e) {
        return (0, _array.filter)(e, _this2.getPentonville());
      }).map(_array.map).sort(_array.sort).reduce(_array.reduce, []);
    }
  }, {
    key: "retainFocus",
    value: function retainFocus(node) {
      (node || this.getPentonville()).focus();
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "pentonville",
        ref: this.setPentonville,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }, children);
    }
  }]);
}(_react.Component);
Pentonville.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.arrayOf(_propTypes.default.element)]).isRequired
};