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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var SELECTOR = '\n/*\n * Implicit "tabindex"\n */\ninput:not([tabindex^=\'-\']):not(:disabled),\nselect:not([tabindex^=\'-\']):not(:disabled),\ntextarea:not([tabindex^=\'-\']):not(:disabled),\nbutton:not([tabindex^=\'-\']):not(:disabled),\nobject:not([tabindex^=\'-\']):not(:disabled)\na[href]:not([tabindex^=\'-\']),\n/*\n *  Explicit "tabindex"\n */\n*[tabindex]:not([tabindex^=\'-\']):not(:disabled)\n';
// const NEUTRAL = 0 // no change
var INFINITY = Number.POSITIVE_INFINITY;
var POSITIVE = +1; // move right
var NEGATIVE = -1; // move left

var isKeyTab = function isKeyTab(_ref) {
  var key = _ref.key;
  return key === 'Tab';
};
var inVisible = function inVisible(_ref2) {
  var display = _ref2.display,
      visibility = _ref2.visibility;
  return display === 'none' || visibility === 'hidden';
};
var isVisible = function isVisible(computedStyle) {
  return !inVisible(computedStyle);
};
var toNumber = function toNumber(value) {
  return parseInt(value, 10);
};

var getVisibilityFromComputedStyle = function getVisibilityFromComputedStyle(element) {
  return isVisible(getComputedStyle(element)) ? element !== document.documentElement ? getVisibilityFromComputedStyle(element.parentElement) : true : false;
};

var filter = function filter(e) {
  return getVisibilityFromComputedStyle(e);
};

function map(delta, order) {
  var value = toNumber(delta.getAttribute('tabindex'));
  var index = isNaN(value) || value === 0 ? INFINITY : value;
  return {
    delta: delta,
    order: order,
    index: index
  };
}

function sort(_ref3, _ref4) {
  var currentOrder = _ref3.order,
      currentIndex = _ref3.index;
  var siblingOrder = _ref4.order,
      siblingIndex = _ref4.index;

  /*
   * 'currentOrder' and 'siblingOrder' can never be the same (they are
   *  mapped from the index of an element's position in the DOM) so
   *  it's only necessary to test for "more than" or "less than"
   */
  if (currentOrder < siblingOrder) {
    if (currentIndex === INFINITY) {
      if (siblingIndex === INFINITY) {
        // if (currentIndex === siblingIndex) {
        return NEGATIVE;
      } else {
        /*
         * inifinity is always more than 'siblingIndex'
         */
        return POSITIVE;
      }
    } else {
      if (siblingIndex === INFINITY) {
        /*
         * 'currentIndex' is always less than infinity
         */
        return NEGATIVE;
      } else {
        if (currentIndex === siblingIndex) {
          return NEGATIVE;
        } else {
          if (currentIndex < siblingIndex) {
            return NEGATIVE;
          }

          if (currentIndex > siblingIndex) {
            return POSITIVE;
          }
        }
      }
    }
  }

  if (currentOrder > siblingOrder) {
    if (currentIndex === INFINITY) {
      /*
       * 'currentOrder' is more than 'siblingOrder' so if
       * 'currentIndex' is inifinity then the result must be POSITIVE
       */
      return POSITIVE;
    } else {
      if (siblingIndex === INFINITY) {
        /*
         * 'currentIndex' is always less than infinity
         */
        return NEGATIVE;
      } else {
        if (currentIndex === siblingIndex) {
          return POSITIVE;
        } else {
          if (currentIndex < siblingIndex) {
            return NEGATIVE;
          }

          if (currentIndex > siblingIndex) {
            return POSITIVE;
          }
        }
      }
    }
  }
}

var reduce = function reduce(array, _ref5, i, a) {
  var delta = _ref5.delta;

  if (i) {
    var type = delta.type;

    if (type === 'radio') {
      var n = i - 1;
      var alpha = a[n].delta;
      var TYPE = alpha.type;

      if (type === TYPE) {
        var name = delta.name;
        var NAME = alpha.name;

        if (name === NAME) {
          return array;
        }
      }
    }
  }
  return array.concat(delta);
};

var getAlpha = function getAlpha(_ref6) {
  var _ref7 = _slicedToArray(_ref6, 1),
      alpha = _ref7[0];

  return alpha;
};
var getOmega = function getOmega(_ref8) {
  var _ref9 = _toArray(_ref8),
      nodeList = _ref9.slice(0);

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
    var _ref10;

    var _temp, _this, _ret;

    _classCallCheck(this, Pentonville);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref10 = Pentonville.__proto__ || Object.getPrototypeOf(Pentonville)).call.apply(_ref10, [this].concat(args))), _this), _this.setPentonville = function (pentonville) {
      return pentonville ? !!(_this.pentonville = pentonville) : delete _this.pentonville;
    }, _this.getPentonville = function () {
      return _this.pentonville;
    }, _this.onKeyDown = function (event) {
      if (isKeyTab(event)) {
        var nodeList = _this.getNodeListArray();

        event.stopPropagation();

        if (nodeList.length) {
          var target = event.target;


          event.preventDefault();

          if (isOmega(target, nodeList)) {
            var alpha = getAlpha(nodeList);

            _this.retainFocus(alpha);
          } else {
            var delta = getDelta(target, nodeList);

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

      var target = event.target;


      if (_this.hasNodeListMatch(target)) {
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

      var relatedTarget = event.relatedTarget;


      if (_this.hasNodeListMatch(relatedTarget)) {
        // relatedTarget can be null
        return;
      } else {
        var delta = event.target;


        _this.retainFocus(delta);
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
      var nodeList = this.queryForNodeList();
      return Array.from(nodeList).filter(filter).map(map).sort(sort).reduce(reduce, []);
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