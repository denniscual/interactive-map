import { createElement } from 'react'
import * as nodes from './nodes'
import * as types from '../types'

const e = createElement
/**
 * Recursively creates react elements based in given element which of type Element | HTMLDocument.
 * It retains the svg element tree. Means that returned react tree is based in svg tree.
 */
const createReactElements = (
  element: Element | SVGSVGElement,
  activeAreaDispatch: React.Dispatch<types.ActiveArea>,
  key?: number
): JSX.Element => {
  const nodeType = element.nodeName
  // Read and get the attributes of the element.
  const attributes = nodes.getAttributesOfElement(element)
  // create react element props with key
  const props = { ...attributes, key }

  // Attaching click handler to area element
  const { className } = attributes
  const extendedPropsForAreaType =
    // NOTE: blacklisting `walkable-area` className. In the future, we gonna
    // add a solution which will provide same behaviour but not depending to `className`.
    className && className.includes('area') && className !== 'walkable-area'
      ? {
          ...props,
          onClick: (e: MouseEvent) => {
            // disable the bubbling phase to prevent persisting
            // the parent id in active area state.
            e.stopPropagation()
            activeAreaDispatch(attributes.id)
          },
        }
      : props

  // Convert HTMLCollection, array-like object, into real array.
  // get the document name
  const children = Array.from(element.children)
  if (children.length > 0) {
    // create react element
    return e(
      nodeType,
      extendedPropsForAreaType,
      children.map((child, index) => {
        return createReactElements(child, activeAreaDispatch, index)
      })
    )
  }
  // If textContent is not null
  const childrenText = element.textContent && element.textContent.trim()
  return e(nodeType, extendedPropsForAreaType, childrenText)
} // Function createReactElements

const parseAndGetNodeBySelector = (
  stringSource: string,
  selector: string,
  type: SupportedType = 'image/svg+xml'
) => {
  const parser = new DOMParser()
  return parser
    // parse an svg content string
    .parseFromString(stringSource.trim(), type)
    // returns a SVGDocument, which also is a Document.
    .querySelector(selector) as Element
}

/**
 * Parsing svg string source into react elements. It used DOMParser under the hood
 * for parsing the string source.
 */
const parseToReactElements = (
  svgStringSource: string,
  activeAreaDispatch: React.Dispatch<types.ActiveArea>
) => {
  const svgElement = parseAndGetNodeBySelector(svgStringSource, '#map-area')
  return createReactElements(svgElement as SVGSVGElement, activeAreaDispatch)
} // Function parseToReactElements

const getSVGRootProps = (svgStringSource: string) => {
  const svg = parseAndGetNodeBySelector(svgStringSource, 'svg')
  return nodes.getAttributesOfElement(svg) as React.SVGAttributes<SVGElement>
}

export { parseToReactElements, getSVGRootProps }
