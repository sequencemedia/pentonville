import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  filter,
  map,
  sort,
  reduce
} from './array'

import {
  CANFOCUS,
  TABINDEX
} from './constants'

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

  inPentonville (element) { // null returns false from 'contains'
    return this.getPentonville().contains(element)
  }

  canFocus (element) {
    return this.inPentonville(element) && element.matches(CANFOCUS)
  }

  hasNodeListMatch (element) {
    return this.inPentonville(element) && element.matches(TABINDEX)
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

    if (!this.canFocus(DELTA)) { // relatedTarget can be null
      const { target: DELTA } = event

      this.retainFocus(
        DELTA
      )
    }
  }

  onFocus = (event) => {
    event.stopPropagation()
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
