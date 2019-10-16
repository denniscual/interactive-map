import React from 'react'
import InteractiveMaps from './InteractiveMaps'
import { useInteractiveMaps } from './maps'
import * as floors from './floors'
import * as navigation from './navigation'
import * as appStateManager from './app-state-manager'
import * as layouts from './layouts'
import * as Types from './types'

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const useSwitchFloor = () => {
  const { activeArea, activeFloor } = appStateManager.appSetters
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()
  return React.useCallback(
    (id: string) => {
      // update the active floor
      activeFloor.setID(id)
      // reset the navigation
      navigationDispatch({ type: 'RESET' })
      // clear the active area when switching floor
      activeArea.setID('RESET')
    },
    [activeArea, activeFloor, navigationDispatch]
  )
}

const useWayfinder = () => {
  const { activeArea, activeFloor } = appStateManager.appSetters
  const mapNavigation = navigation.stateManager.useNavigation()
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()
  return React.useCallback(
    (area: Types.StoreArea) => {
      const { startpoint } = mapNavigation
      if (!startpoint) {
        throw new Error(
          'No navigation startpoint. Make sure that the startpoint is properly set'
        )
      }
      activeFloor.setID(startpoint.floorID)
      activeArea.setID('RESET')
      navigationDispatch({ type: 'END_POINT', payload: area })
    },
    [activeArea, navigationDispatch, activeFloor, mapNavigation]
  )
}

/**
 * * Setting the area for given point. Either starting point or destination point.
 */
const useSetPoint = () => {
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()
  return React.useCallback(
    (area: Types.StoreArea, point: 'START_POINT' | 'END_POINT') =>
      navigationDispatch({ type: point, payload: area }),
    [navigationDispatch]
  )
}

const utils = {
  useSwitchFloor,
  useWayfinder,
  useSetPoint,
}

export {
  InteractiveMaps as default,
  useInteractiveMaps,
  floors,
  appStateManager,
  layouts,
  utils,
  Types,
}
