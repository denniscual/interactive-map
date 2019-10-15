import React from 'react'
import { useConsumeContext } from '../__utils__'
import * as types from '../types'

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

const useDataSource = () => useConsumeContext(DataSourceContext, dataSourceName)

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Others
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export { DataSourceContext, useDataSource }
