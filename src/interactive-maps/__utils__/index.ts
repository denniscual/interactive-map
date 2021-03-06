import React from 'react'
import * as svg from './svg'
import * as nodes from './nodes'
import * as mapElements from './map-elements'
import { GENERAL_ERROR_TYPE } from '../constants'
import { MapNodeDirections, DirectionType } from '../map-nodes/types'
import * as types from '../types'

const getShortestPaths = require('./get-shortest-paths').default

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Error utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const createError = (error: Error) => {
  error.name = GENERAL_ERROR_TYPE
  return error
}

const NotFoundNodeError = (path: string) => {
  const err = new Error(`path '${path}' was not found in map nodes collection.`)
  return createError(err)
}

const usePrevious: <T>(value: T) => T | null = value => {
  const prev = React.useRef<(typeof value) | null>(null)
  React.useEffect(() => {
    prev.current = value
  }, [value])
  return prev.current
}

const noop = () => {}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// State Manager Utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const actionTypeErrorMsg = 'The action type is not supported!'

/**
 * A type-safe hook for returning a `dispatch` based in `Context`. If the `dispatch` returned
 * by the `Context` is undefined due to consuming the `Context` outside its `Provider`, then it throws
 * a `Interactive Maps Error`. Else, it will return the `dispatch`.
 */
const useCreateDispatch: <A>(
  DispatchContext: React.Context<React.Dispatch<A> | undefined>,
  ProviderName: string,
  dispatchName?: string
) => React.Dispatch<A> = (DispatchContext, ProviderName, dispatchName) => {
  const dispatch = React.useContext(DispatchContext)
  if (!dispatch) {
    const _dispatchName = dispatchName || 'useDispatch'
    throw createError(
      new Error(
        `Error caught while consuming a Dispatch Context. ${_dispatchName} must be used within a ${ProviderName}.`
      )
    )
  }
  return dispatch
}
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

export const createMapGraphAndMapNodes = (
  mapNodes: types.MapNodesProps[]
): types.MapGraphAndMapNodes => {
  if (!nodes) {
    return { mapNodes: {}, mapGraph: {} }
  }
  const mapGraph = mapNodes
    // Iterate to each node and create an array of nodes which has a weighted direct nodes assign.
    .map(baseNode => {
      const { 'data-direct-nodes': directNodes } = baseNode
      // Assigned a weighted, distance value, to all direct nodes of a base node.
      const weightedDirectNodesArr = directNodes.map(path => {
        const givenDirectNode = mapNodes.find(node => node.id === path)
        if (!givenDirectNode) {
          throw NotFoundNodeError(path)
        }
        const distance = getDistanceBetweenNodes(
          {
            x: baseNode.cx,
            y: baseNode.cy,
          },
          {
            x: givenDirectNode.cx,
            y: givenDirectNode.cy,
          }
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
  const newMapNodes: types.MapNodes = mapNodes.reduce(
    (acc, node) => ({
      ...acc,
      [node.id]: {
        id: node.id,
        coordinates: {
          x: node.cx,
          y: node.cy,
        },
        directNodes: node['data-direct-nodes'],
      },
    }),
    {}
  )
  return {
    mapNodes: newMapNodes,
    mapGraph,
  }
}

export {
  getShortestPaths,
  svg,
  nodes,
  createError,
  NotFoundNodeError,
  mapElements,
  usePrevious,
  noop,
  actionTypeErrorMsg,
  useCreateDispatch,
}
