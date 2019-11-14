import React from 'react'
import InteractiveMaps from './InteractiveMaps'
import { useInteractiveMaps } from './maps'
import * as floors from './floors'
import * as navigation from './navigation'
import * as appStateManager from './app-state-manager'
import * as layouts from './layouts'
import { useDataSource } from './contexts'
import { createError } from './__utils__'
import { useTranslate, getDefaultLanguage } from './translations'
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
  const { general } = useDataSource()
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()
  return React.useCallback(
    (areaID: string) => {
      const startpointArea = storeAreas[general.defaultStartingPoint]
      const destination = storeAreas[areaID]

      if (!destination) {
        throw createError(
          new Error(
            `Area ID'${areaID}' was not found in store areas collection.`
          )
        )
      }

      activeFloor.setID(startpointArea.floorID)
      // activeArea.setID('RESET')
      activeArea.setID(destination.id)
      navigationDispatch({ type: 'RESET', payload: { endpoint: destination } })
    },
    [
      activeArea,
      navigationDispatch,
      activeFloor,
      storeAreas,
      general.defaultStartingPoint,
    ]
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
  onClick: () => void
}

const useAreaItemsByFloor = (): (Types.StoreArea &
  UIProps & { label: string })[] => {
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  const { activeFloorID, activeAreaID } = useAppSelector(state => ({
    activeFloorID: state.activeFloor,
    activeAreaID: state.activeArea.id,
  }))
  const wayfinder = useWayfinder()
  const translate = useTranslate()

  return React.useMemo(() => {
    const areaItems = []
    for (const key in storeAreas) {
      const storeArea = storeAreas[key]
      // Filter only the areas from the `activeFloor` and only `store` areas.
      if (storeArea.floorID === activeFloorID && storeArea.type === 'store') {
        areaItems.push({
          ...storeArea,
          // NOTE: We already localised the label of the area.
          label: translate(storeArea.id, { defaultLang: getDefaultLanguage() }),
          isActive: storeArea.id === activeAreaID,
          onClick: () => wayfinder(storeArea.id),
        })
      }
    }
    return areaItems
  }, [storeAreas, activeFloorID, activeAreaID, wayfinder, translate])
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

const useMapItems = (): (Types.Map & Omit<UIProps, 'onClick'>)[] => {
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

const useActiveArea = () => {
  const activeArea = useAppSelector(appUtils.getActiveArea)
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  if (typeof activeArea.id === 'string') {
    return storeAreas[activeArea.id]
  }
}

/**
 * This is useful when creating `DeviceMarker` wherein the returned data is
 * coming from the set `startingPoint`.
 */
const useDeviceLocation = () => {
  const {
    general: { defaultStartingPoint, deviceAngle },
  } = useDataSource()
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  const storeArea = storeAreas[defaultStartingPoint]
  // device location area must only hold 1 node.
  const storeFloors = floors.stateManager.useFloorsToObj()
  if (storeArea) {
    const {
      graphAndNodes: { mapNodes },
    } = storeFloors[storeArea.floorID]
    // device location area must only hold 1 node.
    const deviceNode = mapNodes[storeArea.nodes[0]]
    return {
      ...deviceNode.coordinates,
      angle: deviceAngle,
    }
  }
}

const useDefaultData = (): { floorID: string; startingpointArea: string } => {
  const {
    general: { defaultStartingPoint },
  } = useDataSource()
  // TODO: We need to store the `state` into a Provider Component
  // so that we can control the accessing to this `state`. Basically,
  // we only want to consume this into Component or hooks. `appSetters`
  // can only be called also inside Component or hooks. We gonna do this
  // to remove indirection issue.
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  const storeArea = storeAreas[defaultStartingPoint]
  if (!storeArea) {
    throw createError(
      new Error(
        `Area ID '${defaultStartingPoint}' was not found in store areas collection.`
      )
    )
  }
  return {
    floorID: storeArea.floorID,
    startingpointArea: storeArea.id,
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
  useDefaultData,
  useActiveArea,
}

export { InteractiveMaps as default, layouts, utils, Types }
