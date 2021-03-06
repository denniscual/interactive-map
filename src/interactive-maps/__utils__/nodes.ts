import React from 'react'
import camelCase from 'lodash.camelcase'
import * as types from '../types'

interface ElementAttrs {
  [index: string]: string
}

export const getAttributesOfElement = (element: Element): ElementAttrs => {
  const attributes = element.attributes
  const attrs: ElementAttrs = {}
  if (attributes) {
    for (let index = 0; index < attributes.length; index++) {
      const attr = attributes.item(index)
      if (attr) {
        const { name, value } = attr
        // We need to hardly change the casing of 'class' attribute name into 'className'
        let attrName = ''
        if (name === 'class') {
          attrName = 'className'
        } else if (name.startsWith('data-')) {
          attrName = name
        } else {
          attrName = camelCase(name)
        }
        attrs[attrName] = value
      }
    }
  }
  return attrs
} // Function getAttributesOfElement

type TempMapNodeProps = Pick<
  types.MapNodesProps,
  'id' | 'cx' | 'cy' | 'data-direct-nodes'
>

/**
 * Creating new direct nodes based in old direct nodes. Basically the elements
 * in old direct nodes are node['data-key-id'] where we gonna map it to use the node.id.
 */
export const createNewDirectNodes = (
  mapNodes: types.MapNodesProps[],
  node: types.MapNodesProps | TempMapNodeProps
) => {
  const oldDirectNodes = node['data-direct-nodes']
  if (oldDirectNodes) {
    const newDirectNodes = oldDirectNodes
      .map(directNodeKeyID => {
        const foundMapNode = mapNodes.find(
          mapNode => mapNode['data-key-id'] === directNodeKeyID
        )
        if (foundMapNode) {
          return foundMapNode.id
        }
        return ''
      })
      .filter(mapNode => mapNode !== '')
    return newDirectNodes
  }
  return []
}

export const createDirectNodesWithValueKeyID = (
  mapNodes: types.MapNodesProps[],
  node: types.MapNodesProps | TempMapNodeProps
) => {
  const oldDirectNodes = node['data-direct-nodes']
  if (oldDirectNodes) {
    const newDirectNodes = oldDirectNodes
      .map(nodeID => {
        const foundMapNode = mapNodes.find(mapNode => mapNode.id === nodeID)
        if (foundMapNode) {
          return foundMapNode['data-key-id']
        }
        return ''
      })
      .filter(mapNode => mapNode !== '')
    return newDirectNodes
  }
  return []
}

export const transformArrayToObject: <T extends object>(
  arr: T[],
  field: keyof T
) => Record<string, T> = (arr, field) =>
  arr.reduce((acc, value) => {
    // Escape hatch to convert `value[field]` type into string type.
    const propName: any = value[field]
    return {
      ...acc,
      [propName as string]: value,
    }
  }, {})

export const transformElementsToArray: <T extends object>(
  elements: React.ReactElement<T>[]
) => T[] = elements => {
  return React.Children.map(elements, element => ({
    ...element.props,
  }))
}

/**
 * Transforming react elements into object.
 */
export const transformElementsToObject: <T extends object>(
  elements: React.ReactElement<T>[],
  field: keyof T
) => Record<string, T> = (elements, field) => {
  const arr = transformElementsToArray(elements)
  return transformArrayToObject(arr, field)
}

export const createMapNodesObj = (
  floors: types.EnhancedFloors,
  activeFloorID: string
) => {
  const activeFloor = floors.find(floor => floor.id === activeFloorID)
  // Return empty because sometimes are maps doesn't have associated nodes.
  if (!activeFloor) {
    return {}
  }
  const enhancedMapNodes = activeFloor.nodes.map(mapNode => ({
    ...mapNode,
    'data-direct-nodes': createDirectNodesWithValueKeyID(
      activeFloor.nodes,
      mapNode
    ),
  }))
  return transformArrayToObject(enhancedMapNodes, 'id')
}
