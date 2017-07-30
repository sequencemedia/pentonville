import React, { Component } from 'react'
import PropTypes from 'prop-types'

const SELECTOR = `
/*
 * Implicit "tabindex"
 */
input:not([tabindex^='-']):not(:disabled),
select:not([tabindex^='-']):not(:disabled),
textarea:not([tabindex^='-']):not(:disabled),
button:not([tabindex^='-']):not(:disabled),
object:not([tabindex^='-']):not(:disabled)
a[href]:not([tabindex^='-']),
/*
 *  Explicit "tabindex"
 */
*[tabindex]:not([tabindex^='-']):not(:disabled)
`
// const NEUTRAL = 0 // no change
const INFINITY = Number.POSITIVE_INFINITY
const POSITIVE = +1 // move right
const NEGATIVE = -1 // move left

const isKeyTab = ({ key }) => key === 'Tab'
const inVisible = ({ display, visibility }) => (display === 'none' || visibility === 'hidden')
const isVisible = (computedStyle) => !inVisible(computedStyle)
const toNumber = (value) => parseInt(value, 10)

const getVisibilityFromComputedStyle = (element) => (
  isVisible(getComputedStyle(element))
    ? (element !== document.documentElement)
      ? getVisibilityFromComputedStyle(element.parentElement)
      : true
    : false
)

const filter = (e) => getVisibilityFromComputedStyle(e)

function map (delta, order) {
  const value = toNumber(delta.getAttribute('tabindex'))
  const index = isNaN(value) || value === 0 ? INFINITY : value
  return ({
    delta,
    order,
    index
  })
}

function sort ({
  order: currentOrder,
  index: currentIndex }, {
  order: siblingOrder,
  index: siblingIndex
}) {
  /*
   * 'currentOrder' and 'siblingOrder' can never be the same (they are
   *  mapped from the index of an element's position in the DOM) so
   *  it's only necessary to test for "less than"
   */
  if (currentOrder < siblingOrder) {
    if (currentIndex === INFINITY) {
      if (siblingIndex === INFINITY) {
        return NEGATIVE
      } else {
        /*
         * inifinity is always more than 'siblingIndex'
         */
        return POSITIVE
      }
    } else {
      if (siblingIndex === INFINITY) {
        /*
         * 'currentIndex' is always less than infinity
         */
        return NEGATIVE
      } else {
        return currentIndex - siblingIndex
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
      return POSITIVE
    } else {
      if (siblingIndex === INFINITY) {
        /*
         * 'currentIndex' is always less than infinity
         */
        return NEGATIVE
      } else {
        return currentIndex - siblingIndex
      }
    }
  }
}

const reduce = (array, { delta }, i, a) => {
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

const getAlpha = ([ alpha ]) => alpha
const getOmega = ([ ...nodeList ]) => nodeList.pop()
const getDelta = (delta, nodeList) => {
  const i = nodeList.findIndex((node) => node === delta) + 1
  const n = i === nodeList.length ? 0 : i
  return nodeList[n]
}

const isAlpha = (node, nodeList) => (
  node === getAlpha(nodeList)
)

const isOmega = (node, nodeList) => (
  node === getOmega(nodeList)
)

export default class Pentonville extends Component {
  setPentonville = (pentonville) => (pentonville) ? !!(this.pentonville = pentonville) : delete this.pentonville
  getPentonville = () => this.pentonville

  hasNodeListMatch (element) { // a null element returns false from 'contains'
    return this.getPentonville().contains(element) && element.matches(SELECTOR)
  }

  queryForNodeList () {
    return this.getPentonville().querySelectorAll(SELECTOR)
  }

  getNodeListArray () {
    const nodeList = this.queryForNodeList()
    return Array.from(nodeList)
      .filter(filter)
      .map(map)
      .sort(sort)
      .reduce(reduce, [])
  }

  retainFocus (node) {
    (node || this.getPentonville())
      .focus()
  }

  onKeyDown = (event) => {
    if (isKeyTab(event)) {
      const nodeList = this.getNodeListArray()

      event.stopPropagation()

      if (nodeList.length) {
        const { target: DELTA } = event

        event.preventDefault()

        if (isOmega(DELTA, nodeList)) {
          const alpha = getAlpha(nodeList)

          this.retainFocus(
            alpha
          )
        } else {
          const delta = getDelta(DELTA, nodeList)

          this.retainFocus(
            delta
          )
        }
      }
    }
  }

  onKeyUp = (event) => {
    if (isKeyTab(event)) {
      event.stopPropagation()
    }
  }

  onFocus = (event) => {
    event.stopPropagation()

    const { target: delta } = event

    if (this.hasNodeListMatch(delta)) {
      return
    } else {
      const nodeList = this.getNodeListArray()

      if (nodeList.length) {
        const alpha = getAlpha(nodeList)

        this.retainFocus(
          alpha
        )
      }
    }
  }

  onBlur = (event) => {
    event.stopPropagation()

    const { relatedTarget: delta } = event

    if (this.hasNodeListMatch(delta)) { // relatedTarget can be null
      return
    } else {
      const { target: delta } = event

      this.retainFocus(
        delta
      )
    }
  }

  render () {
    const { children } = this.props

    return (
      <div
        className='pentonville'
        ref={this.setPentonville}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onFocus={this.onFocus}
        onBlur={this.onBlur}>
          {children}
      </div>
    )
  }
}

Pentonville.propTypes = {
  children: PropTypes.element.isRequired
}
