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

const getVisibilityFromComputedStyle = (element) => (
  isVisible(getComputedStyle(element))
    ? (element !== document.documentElement)
      ? getVisibilityFromComputedStyle(element.parentElement)
      : true
    : false
)

const filterByVisibility = (e) => getVisibilityFromComputedStyle(e)

const sortByTabIndex = (current, sibling) => { // current, sibling
  const currentIndex = current.hasAttribute('tabindex') ? current.getAttribute('tabindex') : NaN
  const siblingIndex = sibling.hasAttribute('tabindex') ? sibling.getAttribute('tabindex') : NaN

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
  getPentonville () { return this.refs.pentonville }

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
      const { target } = event
      const nodeList = this.getNodeListArray()

      event.stopPropagation()

      if (isOmega(target, nodeList)) {
        event.preventDefault()

        this.retainFocus(
          getAlpha(nodeList)
        )
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
    const {
      target
    } = event

    event.stopPropagation()

    if (nodeList.includes(target)) {
      return
    } else {
      const pentonville = this.getPentonville()

      if (target === pentonville) {
        return
      }

      this.retainFocus(
        getAlpha(nodeList)
      )
    }
  }

  onBlur = (event) => {
    const nodeList = this.getNodeListArray()
    const {
      relatedTarget
    } = event

    event.stopPropagation()

    if (nodeList.includes(relatedTarget)) {
      return
    } else {
      const {
        target
      } = event

      this.retainFocus(target)
    }
  }

  render () {
    const { children } = this.props

    return (
      <div
        className='pentonville'
        ref='pentonville'
        tabIndex={0}
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
