"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.to-primitive.js");
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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _array = require("./array");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _toArray(r) { return _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _iterableToArray(r) { var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value); return o; } }
function _slicedToArray(r, e) { return _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
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
    nodeList = _arrayLikeToArray(_ref5).slice(0);
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