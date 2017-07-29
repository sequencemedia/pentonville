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
const NEUTRAL = 0 // no change
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

const filterByVisibility = (e) => getVisibilityFromComputedStyle(e)

const sortByTabIndex = (current, sibling) => { // current, sibling
  /* String or null */
  const currentValue = current.getAttribute('tabindex')
  const siblingValue = sibling.getAttribute('tabindex')

  let c, s

  /* Only positive integers or NaN */
  const currentIndex = !!(c = toNumber(currentValue)) ? c : NaN
  const siblingIndex = !!(s = toNumber(siblingValue)) ? s : NaN

  return isNaN(currentIndex) ? isNaN(siblingIndex) ? NEUTRAL : POSITIVE : isNaN(siblingIndex) ? NEGATIVE : currentIndex - siblingIndex
}

const getAlpha = ([ alpha ]) => alpha
const getOmega = ([ ...nodeList ]) => nodeList.pop()

const isAlpha = (node, nodeList) => (
  node === getAlpha(nodeList)
)

const isOmega = (node, nodeList) => (
  node === getOmega(nodeList)
)

export default class Pentonville extends Component {
  setPentonville = (pentonville) => (pentonville) ? !!(this.pentonville = pentonville) : delete this.pentonville
  getPentonville = () => this.pentonville

  queryForNodeList () {
    return this.getPentonville().querySelectorAll(SELECTOR)
  }

  getNodeListArray () {
    const nodeList = this.queryForNodeList()

    return Array.from(nodeList)
      .filter(filterByVisibility)
      .sort(sortByTabIndex)
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
        const { target } = event

        if (isOmega(target, nodeList)) {
          const alpha = getAlpha(nodeList)

          event.preventDefault()

          this.retainFocus(
            alpha
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
    const nodeList = this.getNodeListArray()

    event.stopPropagation()

    if (nodeList.length) {
      const { target } = event

      if (nodeList.includes(target)) {
        return
      } else {
        const alpha = getAlpha(nodeList)

        this.retainFocus(
          alpha
        )
      }
    }
  }

  onBlur = (event) => {
    const nodeList = this.getNodeListArray()

    event.stopPropagation()

    if (nodeList.length) {
      const { relatedTarget } = event

      if (nodeList.includes(relatedTarget)) {
        return
      } else {
        const { target } = event

        this.retainFocus(
          target
        )
      }
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
