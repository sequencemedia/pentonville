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

export const filter = (e, p = document.documentElement) => getVisibilityFromComputedStyle(e, p)

export function map (delta, order) {
  const value = toNumber(delta.getAttribute('tabindex'))
  const index = isNaN(value) || value === 0 ? INFINITY : value // const index = (value > 0) ? value : INFINITY
  return ({
    delta,
    order,
    index
  })
}

/*
 * 'currentOrder' and 'siblingOrder' can never be the same (they are
 *  mapped from the index of an element's position in the DOM) so
 *  it's only necessary to test for one or the other: here, the test
 *  is for "less than" (such that "else" implies "more than" and need
 *  not be tested for explicitly)
 */
export const sort = ({
  order: currentOrder,
  index: currentIndex }, {
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
      const { delta: alpha } = a[n]
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
