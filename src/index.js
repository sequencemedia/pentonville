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

const getFirst = ([ first ]) => first
const getLast = ([ ...all ]) => all.pop()

const isFirst = (node, nodeList) => (
  node === getFirst(nodeList)
)
const isLast = (node, nodeList) => (
  node === getLast(nodeList)
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

  onKeyDown = (event) => {
    if (isKeyTab(event)) {
      const { target } = event
      const nodeList = this.getNodeListArray()

      if (isLast(target, nodeList)) {
        event.preventDefault()
        event.stopPropagation()
        getFirst(nodeList).focus()
      }
    }
  }

  onKeyUp = (event) => {
    if (isKeyTab(event)) {
      const { target } = event
      const nodeList = this.getNodeListArray()

      if (isLast(target, nodeList)) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
    }
  }

  onFocus = (event) => {
    const nodeList = this.getNodeListArray()
    const {
      target
    } = event

    if (!nodeList.includes(target)) {
      event.stopPropagation()
      getFirst(nodeList).focus()
    } else {
      const pentonville = this.getPentonville()
      const {
        relatedTarget
      } = event

      if (!pentonville.contains(relatedTarget)) {
        event.stopPropagation()
        getFirst(nodeList).focus()
      }
    }
  }

  onBlur = (event) => {
    const nodeList = this.getNodeListArray()
    const {
      target
    } = event

    if (!nodeList.includes(target)) {
      event.stopPropagation()
      getFirst(nodeList).focus()
    } else {
      const pentonville = this.getPentonville()
      const {
        relatedTarget
      } = event

      if (!pentonville.contains(relatedTarget)) {
        event.stopPropagation()
        getFirst(nodeList).focus()
      }
    }
  }

  render () {
    const { children } = this.props

    return (
      <div
        className='pentonville'
        ref='pentonville'
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
