'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;
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

/*
 *  Recursion can stop at the "pentonville" element, which is passed as
 *  "p", otherwise defaulting to the "document.documentElement" element
 *  (which is the <html /> element) if it is not passed
 */
var filter = exports.filter = function filter(e) {
  var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getVisibilityFromComputedStyle(e, p);
};

// const value = toNumber(delta.getAttribute('tabindex'))
// const index = isNaN(value) || value === 0 ? INFINITY : value // const index = (value > 0) ? value : INFINITY
/*
 *  Zero and NaN are falsy so default to Infinity (which may as well
 *  be zero or NaN but instead means "a number other than any possible
 *  positive tabindex"). The value of "order" is just the position
 *  of this element in the NodeList which results from the DOM query
 */
var map = exports.map = function map(delta, order) {
  return {
    delta: delta,
    order: order,
    index: toNumber(delta.getAttribute('tabindex')) || INFINITY
  };
};

/*
 *  'currentOrder' and 'siblingOrder' can never be equal (because each
 *  number represents an element's position in the DOM, and no two
 *  elements can occupy the same position) so it's only necessary
 *  to compare these numbers with "more than" or "less than": here,
 *  the comparison is with "less than" and, consequently, "else"
 *  necessarily implies "more than"
 */
var sort = exports.sort = function sort(_ref2, _ref3) {
  var currentOrder = _ref2.order,
      currentIndex = _ref2.index;
  var siblingOrder = _ref3.order,
      siblingIndex = _ref3.index;
  return currentOrder < siblingOrder ? currentIndex === INFINITY ? siblingIndex === INFINITY ? NEGATIVE : POSITIVE : siblingIndex === INFINITY ? NEGATIVE : currentIndex - siblingIndex : currentIndex === INFINITY ? POSITIVE : siblingIndex === INFINITY ? NEGATIVE : currentIndex - siblingIndex;
};

function reduce(array, _ref4, i, a) {
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
}