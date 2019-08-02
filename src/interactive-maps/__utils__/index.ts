import React from 'react'
import * as svg from './svg'
import * as nodes from './nodes'
import * as mapElements from './map-elements'

const getShortestPaths = require('./get-shortest-paths').default

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Error utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const createError = (
  description: string,
  name: string = 'Interactive Maps Error'
) => {
  const error = new Error(description)
  error.name = name
  return error
}

const NotFoundNodeError = (path: string) =>
  createError(`path '${path}' was not found in map nodes collection.`)

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
      `Error caught while consuming a Dispatch Context. ${_dispatchName} must be used within a ${ProviderName}.`
    )
  }
  return dispatch
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
