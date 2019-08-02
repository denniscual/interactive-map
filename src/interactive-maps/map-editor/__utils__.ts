import * as types from '../types'
import { svg } from '../__utils__'

export const mapNodeHoverIcon = (activeTool: types.ActiveToolTypes) => {
  switch (activeTool) {
    case 'PAN_AND_ZOOM':
    case 'ADD_DIRECT_NODES':
    case 'ADD_NODE_DIRECTION': {
      return 'grab'
    }
    case 'PAN': {
      return 'grabbing'
    }
    case 'ZOOM_IN': {
      return 'zoom-in'
    }
    case 'ZOOM_OUT': {
      return 'zoom-out'
    }
    case 'MOVE_NODE': {
      return 'move'
    }
    case 'NODES_ADDER': {
      return 'crosshair'
    }
    default: {
      return 'auto'
    }
  }
} // Function mapNodeHoverIcon

/**
 * Creating instance of DOMRect based in svg.viewBox
 */
export const createDOMRect = (viewBox: string): DOMRect => {
  if (viewBox !== '') {
    const splitViewBox = viewBox.split(' ')
    const arrayViewBox = []
    for (let index = 0; index < splitViewBox.length; index++) {
      const element = parseInt(splitViewBox[index])
      switch (index) {
        case 0: {
          arrayViewBox.push({ x: element })
        }
        case 1: {
          arrayViewBox.push({ y: element })
        }
        case 2: {
          arrayViewBox.push({ width: element })
        }
        case 3: {
          arrayViewBox.push({ height: element })
        }
      }
    }
    return arrayViewBox.reduce(
      (rect, value) => ({
        ...rect,
        ...value,
      }),
      {}
    ) as DOMRect
  }
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  } as DOMRect
} // Function createDOMRect

/**
 * Creating viewBox value via svg rect
 */
export const createViewBox = (rect: DOMRect) => {
  const viewBoxArr = Object.entries(rect).reduce(
    (acc, value) => {
      const val = Math.round(value[1])
      switch (value[0]) {
        case 'x': {
          acc[0] = val
          break
        }
        case 'y': {
          acc[1] = val
          break
        }
        case 'width': {
          acc[2] = val
          break
        }
        case 'height': {
          acc[3] = val
          break
        }
      }
      return acc
    },
    [] as number[]
  )
  return viewBoxArr.join(' ')
} // Function createViewBox

export const createDirectNodePaths = (
  id: string,
  mapNodes: types.MapNodesProps[]
) => {
  // creating lines between base node and its direct nodes
  const clickedMapNode = mapNodes.find(node => node.id === id)

  if (clickedMapNode) {
    const baseNodePoints = [clickedMapNode.cx, clickedMapNode.cy]

    // adding points to directNodesPoints
    const directNodesPaths = clickedMapNode['data-direct-nodes'].map(
      directNode => {
        const foundMapNode = mapNodes.find(
          node => node['data-key-id'] === directNode
        )
        if (foundMapNode) {
          const directNodePoints = [foundMapNode.cx, foundMapNode.cy]
          const directNodePath = svg.svgShapePath(
            [baseNodePoints, directNodePoints],
            svg.lineCommand
          )
          return directNodePath
        }
      }
    )

    return directNodesPaths
  }
  return ['']
} // Function createDirectNodePaths
