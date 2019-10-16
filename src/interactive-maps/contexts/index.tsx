import React from 'react'
import { createError } from '../__utils__'
import * as types from '../types'

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
/**
 * A type-safe hook for returning a `dispatch` based in `Context`. If the `dispatch` returned
 * by the `Context` is undefined due to consuming the `Context` outside its `Provider`, then it throws
 * a `Interactive Maps Error`. Else, it will return the `dispatch`.
 */
const useConsumeContext: <T>(
  Context: React.Context<T>,
  ProviderName: string
) => T = (Context, ProviderName) => {
  const ctx = React.useContext(Context)
  if (!ctx) {
    throw createError(
      new Error(
        `Error caught while consuming a Context. "useConsumeContext" must be used within a ${ProviderName}.`
      )
    )
  }
  return ctx
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// DataSourceContext
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const dataSourceName = 'DataSourceProvider'

const DataSourceContext = React.createContext<
  types.InteractiveMapsDataSource | undefined
>(undefined)

DataSourceContext.displayName = dataSourceName

const useDataSource = () =>
  useConsumeContext(
    DataSourceContext,
    dataSourceName
  ) as types.InteractiveMapsDataSource

const DataSourceProvider = DataSourceContext.Provider

export { DataSourceProvider, useDataSource, useConsumeContext }
