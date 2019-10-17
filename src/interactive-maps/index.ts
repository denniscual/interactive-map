import React from 'react'
import InteractiveMaps from './InteractiveMaps'
import { useInteractiveMaps } from './maps'
import * as floors from './floors'
import * as navigation from './navigation'
import * as appStateManager from './app-state-manager'
import * as layouts from './layouts'
import { useDataSource } from './contexts'
import * as Types from './types'

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const { useAppSelector, appUtils, appSetters } = appStateManager

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
      // FIXME: THis should point to default floor ID not on the
      // current floor id
      activeFloor.setID(startpoint.floorID)
      activeArea.setID('RESET')
      navigationDispatch({ type: 'RESET', payload: { endpoint: area } })
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

interface UIProps {
  isActive: boolean
  onClick?: () => void
}
const useAreaItemsByFloor = (): (Types.StoreArea & UIProps)[] => {
  const { storeAreas } = useDataSource()
  const { activeFloorID, activeAreaID } = useAppSelector(state => ({
    activeFloorID: state.activeFloor,
    activeAreaID: state.activeArea.id,
  }))
  const wayfinder = useWayfinder()
  return React.useMemo(() => {
    const areaItems = []
    for (const key in storeAreas) {
      const storeArea = storeAreas[key]
      if (storeArea.floorID === activeFloorID) {
        areaItems.push({
          ...storeArea,
          isActive: storeArea.id === activeAreaID,
          onClick: () => wayfinder(storeArea),
        })
      }
    }
    return areaItems
  }, [storeAreas, activeFloorID, activeAreaID, wayfinder])
}
const useFloorItems = (): (Types.EnhancedFloor & UIProps)[] => {
  const mapFloors = floors.stateManager.useStoreFloors()
  const activeFloorID = useAppSelector(appUtils.getActiveFloor)
  const switchFloor = useSwitchFloor()
  return React.useMemo(
    () =>
      mapFloors.map(floor => ({
        ...floor,
        isActive: floor.id === activeFloorID,
        onClick: () => switchFloor(floor.id),
      })),
    [mapFloors, activeFloorID, switchFloor]
  )
}

const useMapItems = (): (Types.Map & UIProps)[] => {
  const activeFloorID = useAppSelector(appUtils.getActiveFloor)
  const maps = useInteractiveMaps()
  return React.useMemo(
    () =>
      maps.map(m => ({
        ...m,
        isActive: m.id === activeFloorID,
      })),
    [maps, activeFloorID]
  )
}

const useResetNavigation = () => {
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()
  const resetActiveFloor = appUtils.useResetActiveFloor()
  return React.useCallback(() => {
    resetActiveFloor()
    navigationDispatch({ type: 'RESET' })
    appSetters.activeArea.setID('RESET')
  }, [navigationDispatch, resetActiveFloor])
}

/**
 * This is useful when creating `DeviceMarker` wherein the returned data is
 * coming from the set `startingPoint`.
 */
const useDeviceLocation = (): { x: number; y: number; angle: number } => {
  const {
    general: { defaultStartingPoint, deviceAngle },
    storeAreas,
  } = useDataSource()
  const storeArea = storeAreas[defaultStartingPoint]
  // device location area must only hold 1 node.
  const {
    graphAndNodes: { mapNodes },
  } = floors.stateManager.useGetFloorByID(storeArea.floorID)
  const deviceNode = mapNodes[storeArea.nodes[0]]
  return {
    ...deviceNode.coordinates,
    angle: deviceAngle,
  }
}

const utils = {
  useSwitchFloor,
  useWayfinder,
  useSetPoint,
  useAreaItemsByFloor,
  useFloorItems,
  useMapItems,
  useResetNavigation,
  useDeviceLocation,
}

export { InteractiveMaps as default, layouts, utils, Types }
