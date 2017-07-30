import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  filter,
  map,
  sort,
  reduce
} from './array'

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

const isKeyTab = ({ key }) => key === 'Tab'

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
      .filter((e) => filter(e, this.getPentonville()))
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

    const { target: DELTA } = event

    if (this.hasNodeListMatch(DELTA)) {
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

    const { relatedTarget: DELTA } = event

    if (this.hasNodeListMatch(DELTA)) { // relatedTarget can be null
      return
    } else {
      const { target: DELTA } = event

      this.retainFocus(
        DELTA
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
