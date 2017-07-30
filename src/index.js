import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  filter,
  map,
  sort,
  reduce
} from './array'

const CANFOCUS = `
  /*
   * Implicit
   */
  label:not(:disabled), /* ? */
  input:not(:disabled),
  select:not(:disabled),
  textarea:not(:disabled),
  button:not(:disabled),
  object:not(:disabled),
  a[href],
  area[href],
  iframe,
  embed,
  /*
   *  Explicit
   */
  *[tabindex]:not(:disabled),
  *[contenteditable]:not(:disabled)
`

const TABINDEX = `
  /*
   * Implicit
   */
  label:not([tabindex^='-']):not(:disabled), /* ? */
  input:not([tabindex^='-']):not(:disabled),
  select:not([tabindex^='-']):not(:disabled),
  textarea:not([tabindex^='-']):not(:disabled),
  button:not([tabindex^='-']):not(:disabled),
  object:not([tabindex^='-']):not(:disabled),
  a[href]:not([tabindex^='-']),
  area[href]:not([tabindex^='-']),
  /*
   *  Explicit
   */
  *[tabindex]:not([tabindex^='-']):not(:disabled),
  *[contenteditable]:not([tabindex^='-']):not(:disabled)
`

const isKeyTab = ({ key }) => key === 'Tab'

const getAlpha = ([ alpha ]) => alpha
const getOmega = ([ ...nodeList ]) => nodeList.pop()
const getDelta = (delta, nodeList) => {
  const i = nodeList.findIndex((node) => node === delta) + 1
  const n = (i === nodeList.length)
    ? 0
    : i
  return nodeList[n]
}

const isAlpha = (node, nodeList) => node === getAlpha(nodeList) // eslint-disable-line

const isOmega = (node, nodeList) => node === getOmega(nodeList)

export default class Pentonville extends Component {
  setPentonville = (pentonville) => (pentonville) ? !!(this.pentonville = pentonville) : delete this.pentonville
  getPentonville = () => this.pentonville

  canFocus (element) { // a null element returns false from 'contains'
    return this.getPentonville().contains(element) && element.matches(CANFOCUS)
  }

  hasNodeListMatch (element) { // a null element returns false from 'contains'
    return this.getPentonville().contains(element) && element.matches(TABINDEX)
  }

  queryForNodeList () {
    return this.getPentonville().querySelectorAll(TABINDEX)
  }

  getNodeListArray () {
    return Array.from(
      this.queryForNodeList()
    )
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

  onBlur = (event) => {
    event.stopPropagation()

    const { relatedTarget: DELTA } = event

    if (!this.canFocus(DELTA)) {
      if (!this.hasNodeListMatch(DELTA)) { // relatedTarget can be null
        const { target: DELTA } = event

        this.retainFocus(
          DELTA
        )
      }
    }
  }

  onFocus = (event) => {
    event.stopPropagation()

    const { target: DELTA } = event

    if (!this.canFocus(DELTA)) {
      if (!this.hasNodeListMatch(DELTA)) { // it's very, very unlikely this will ever execute
        const nodeList = this.getNodeListArray()

        if (nodeList.length) {
          const alpha = getAlpha(nodeList)

          this.retainFocus(
            alpha
          )
        }
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
