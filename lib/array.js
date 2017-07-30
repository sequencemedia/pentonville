'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.sort = sort;
var INFINITY = Number.POSITIVE_INFINITY;
var POSITIVE = +1; // move right
var NEGATIVE = -1; // move left

var inVisible = function inVisible(_ref) {
  var display = _ref.display,
      visibility = _ref.visibility;
  return display === 'none' || visibility === 'hidden';
};
var isVisible = function isVisible(computedStyle) {
  return !inVisible(computedStyle);
};
var toNumber = function toNumber(value) {
  return parseInt(value, 10);
};

var getVisibilityFromComputedStyle = function getVisibilityFromComputedStyle(element, parentElement) {
  return isVisible(getComputedStyle(element)) ? element !== parentElement ? getVisibilityFromComputedStyle(element.parentElement, parentElement) : true : false;
};

var filter = exports.filter = function filter(e) {
  var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getVisibilityFromComputedStyle(e, p);
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

function sort(_ref2, _ref3) {
  var currentOrder = _ref2.order,
      currentIndex = _ref2.index;
  var siblingOrder = _ref3.order,
      siblingIndex = _ref3.index;

  /*
   * 'currentOrder' and 'siblingOrder' can never be the same (they are
   *  mapped from the index of an element's position in the DOM) so
   *  it's only necessary to test for "less than"
   */
  if (currentOrder < siblingOrder) {
    if (currentIndex === INFINITY) {
      if (siblingIndex === INFINITY) {
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
        return currentIndex - siblingIndex;
      }
    }
  } else {
    /*
     *  "more than" is the necessary consequence of not "less than"
     */
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
        return currentIndex - siblingIndex;
      }
    }
  }
}

var reduce = exports.reduce = function reduce(array, _ref4, i, a) {
  var delta = _ref4.delta;

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