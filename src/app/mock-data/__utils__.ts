import { Children } from 'react'
import {
  DirectionType,
  MapNodeDirections,
} from '../../interactive-maps/map-nodes/types'
import * as types from '../../interactive-maps/types'

export const createError = (
  description: string,
  name: string = 'Interactive Maps Error'
) => {
  const error = new Error(description)
  error.name = name
  return error
}

const NotFoundNodeError = (path: string) =>
  createError(`path '${path}' was not found in map nodes collection.`)

/**
 * Creating a nodes directions of type Map. This is reverse tool to transform back
 * the nodes directions into Map coming from stringified version.
 */
export const createNodesDirections = (nodesDirections: unknown) => {
  // When working with `unknown` type, we gonna assert first the data with unknown type.
  const nodes = nodesDirections as {
    id: string
    directions: [string[], DirectionType][]
    // directions => [[['node1', 'node2'], 'LEFT']]
  }[]
  // Creating nodes object which we gonna use to create a wrapper Map.
  return nodes.reduce(
    (acc, node) => {
      return {
        ...acc,
        [node.id]: new Map(node.directions),
      }
    },
    {} as Record<string, MapNodeDirections>
  )
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Creating map graph and map nodes
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

/**
 * Getting the distance between 2 nodes. We gonna use this to create the weight of
 * of edge. Useful for getting the shortest path to the graph.
 */
const getDistanceBetweenNodes = (
  baseNode: types.Coordinates,
  directNode: types.Coordinates
): number => {
  let xs = 0
  let ys = 0

  xs = baseNode.x - directNode.x
  xs = xs * xs

  ys = baseNode.y - directNode.y
  ys = ys * ys

  return Math.sqrt(xs + ys)
}

const transformMapCirclesToNodes = (mapCircles: types.MapCircle[]) => {
  const nodeArr = Children.map(mapCircles, circle => {
    const { id, cx, cy } = circle.props
    const directNodes = circle.props['data-direct-nodes']
    // We gonna define a node based on the circle element.
    const node: types.MapNode = {
      id,
      coordinates: {
        x: cx,
        y: cy,
      },
      directNodes,
    }
    return node
  })
  // We need to create nodes here which is of type Nodes.
  const nodes: types.MapNodes = nodeArr.reduce(
    (acc, node) => ({
      ...acc,
      [node.id]: node,
    }),
    {}
  )
  return nodes
}

export const createMapGraphAndMapNodes = (
  mapCircles: types.MapCircle[]
): types.MapGraphAndMapNodes => {
  if (!mapCircles) {
    return { mapNodes: {}, mapGraph: {} }
  }
  const mapNodes = transformMapCirclesToNodes(mapCircles)
  const mapGraph = Object.keys(mapNodes)
    // Iterate to each node and create an array of nodes which has a weighted direct nodes assign.
    .map(key => {
      const baseNode = mapNodes[key]
      if (!baseNode) {
        throw NotFoundNodeError(key)
      }
      const { directNodes } = baseNode
      // Assigned a weighted, distance value, to all direct nodes of a base node.
      const weightedDirectNodesArr = directNodes.map(path => {
        const givenDirectNode = mapNodes[path]
        if (!givenDirectNode) {
          throw NotFoundNodeError(path)
        }
        const distance = getDistanceBetweenNodes(
          baseNode.coordinates,
          givenDirectNode.coordinates
        )
        return {
          [givenDirectNode.id]: distance,
        }
      })
      // Make it as an object instead of array.
      const weightedDirectNodes = weightedDirectNodesArr.reduce(
        (weightedDirectNodes, value) => ({
          ...weightedDirectNodes,
          ...value,
        }),
        {}
      )
      return {
        [baseNode.id]: weightedDirectNodes,
      }
    })
    // Make the nodes with weighted direct nodes as an object. This would return a graph.
    .reduce(
      (graph, value) => ({
        ...graph,
        ...value,
      }),
      {}
    )
  return {
    mapNodes,
    mapGraph,
  }
}
