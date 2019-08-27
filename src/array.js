const INFINITY = Number.POSITIVE_INFINITY
const POSITIVE = +1 // move right
const NEGATIVE = -1 // move left

const inVisible = ({ display, visibility }) => (display === 'none' || visibility === 'hidden')
const isVisible = (computedStyle) => !inVisible(computedStyle)
const toNumber = (value) => parseInt(value, 10)

const getVisibilityFromComputedStyle = (element, parentElement) => (
  isVisible(getComputedStyle(element))
    ? (element !== parentElement)
      ? getVisibilityFromComputedStyle(element.parentElement, parentElement)
      : true
    : false
)

/*
 *  Recursion can stop at the "pentonville" element, which is passed as
 *  "p", otherwise defaulting to the "document.documentElement" element
 *  (which is the <html /> element) if it is not passed
 */
export const filter = (e, p = document.documentElement) => getVisibilityFromComputedStyle(e, p)

/*
 *  Zero and NaN are falsy so default to Infinity (which may as well
 *  be zero or NaN because it here means "a number other than any
 *  possible positive tabindex")
 *
 *  The value of "order" is just the position of this element in the
 *  NodeList which results from the DOM query
 */
export const map = (delta, order) => ({
  delta,
  order,
  index: toNumber(delta.getAttribute('tabindex')) || INFINITY
})

/*
 *  'currentOrder' and 'siblingOrder' can never be equal (because each
 *  number represents an element's position in the DOM, and no two
 *  elements can occupy the same position) so it's only necessary
 *  to compare these numbers with "more than" or "less than": here,
 *  the comparison is with "less than" and, consequently, "else"
 *  necessarily implies "more than"
 */
export const sort = ({
  order: currentOrder,
  index: currentIndex
}, {
  order: siblingOrder,
  index: siblingIndex
}) => (
  (currentOrder < siblingOrder)
    ? (currentIndex === INFINITY)
      ? (siblingIndex === INFINITY)
        ? NEGATIVE
        : POSITIVE
      : (siblingIndex === INFINITY)
        ? NEGATIVE
        : currentIndex - siblingIndex
    : (currentIndex === INFINITY)
      ? POSITIVE
      : (siblingIndex === INFINITY)
        ? NEGATIVE
        : currentIndex - siblingIndex
)

export function reduce (array, { delta }, i, a) {
  if (i) {
    const { type } = delta
    if (type === 'radio') {
      const n = (i - 1)
      const { delta: alpha } = a[n] // const { [n]: { delta: alpha } } = a
      const {
        type: TYPE
      } = alpha
      if (type === TYPE) {
        const { name } = delta
        const {
          name: NAME
        } = alpha
        if (name === NAME) {
          return array
        }
      }
    }
  }
  return array.concat(delta)
}
