import React, { useMemo, useEffect } from 'react'
import usePortalBetween2Areas from './usePortalBetween2Areas'
import { useInteractiveMapsDispatch } from './state-manager'
import * as floors from '../floors'
import * as nav from '../navigation'
import * as mapNodes from '../map-nodes'
import { appSetters, appUtils, useAppSelector } from '../app-state-manager'
import { VoiceAssistant } from '../voice-assistant'
import * as types from '../types'
import { useDataSource } from '../contexts'

/**
 * Creating route and also returning the portal type used if the route is
 * involving multiple floors.
 */
const useRoute = (
  startpoint: types.StoreArea,
  endpoint: types.StoreArea,
  shortestPortal: types.ShortestPortal
): types.Route =>
  useMemo(() => {
    if (
      // if the navigation only occurs in the same floor.
      startpoint.floorID === endpoint.floorID ||
      // if the navigation occurs between store and portal
      (startpoint.floorID !== endpoint.floorID && shortestPortal.portal === '')
    ) {
      return {
        startpoint: startpoint.id,
        endpoint: endpoint.id,
        floorID: startpoint.floorID as string,
        routeInvolvesMultipleFloors: false,
      }
    }
    // Handle if the navigation occurs in different floors.
    return {
      startpoint: startpoint.id,
      endpoint: shortestPortal.portal,
      // If nextFloorID is not empty, we gonna use nextFloorID as navigation floorID.
      // Else, we gonna use startpoint.floorID
      floorID: startpoint.floorID as string,
      routeInvolvesMultipleFloors: true,
    }
  }, [
    startpoint.floorID,
    startpoint.id,
    endpoint.floorID,
    endpoint.id,
    shortestPortal.portal,
  ])

// Hook useRoute

const useMaps = (route: types.Route) => {
  const maps = floors.stateManager.useFloors()
  return React.useMemo(
    () =>
      maps
        // Only include the defined maps. Default floor map is interactive-maps generated map.
        // It is used for providing a default floor nav. In the future, we gonna omit this.
        .filter(map => map.id !== 'defaultFloor')
        .map(map => {
          const InteractiveMap: React.FC<{
            startpointMarker?: JSX.Element
          }> = props => <map.Map key={map.id} route={route} {...props} />
          return {
            id: map.id,
            Component: InteractiveMap,
          }
        }),
    [route, maps]
  ) as types.Map[]
}

/**
 * Transitioning to next active area and making the area visible.
 * Note: We are dealing with `areaID` now, not `nodeID`.
 */
const useNextActiveArea = (endpoint: string, portal: string) => {
  const { storeAreas } = useDataSource()
  const { activeArea } = appSetters
  const activeFloorID = useAppSelector(appUtils.getActiveFloor)
  const endpointArea = storeAreas[endpoint]

  React.useEffect(
    function settingActiveArea() {
      if (endpointArea && endpointArea.type !== 'portal') {
        activeArea.setID(endpointArea.id)
      } else {
        activeArea.setID('RESET')
      }

      // NOTE: Need to test this new implementation.
      // if (endpointNode) {
      //   const areaID = endpointNode['data-area-id']
      //   activeArea.setID(areaID)
      // } else {
      //   activeArea.setID('RESET')
      // }
    },
    [endpointArea, activeArea]
  )

  React.useEffect(
    function settingVisibleActiveArea() {
      // If the portal is empty, it means that the navigation reaches the destination floor where
      // active area should become active.
      if (
        endpointArea &&
        (endpointArea.type === 'portal' ||
          endpointArea.floorID === activeFloorID)
      ) {
        activeArea.setIsVisible(true)
      } else {
        activeArea.setIsVisible(false)
      }
    },
    [activeArea, endpointArea, activeFloorID]
  )
} // Hook useNextActiveArea

const Maps: React.FC<{
  voiceAssistant?: types.VoiceAssistantModifier
}> = ({ children, voiceAssistant }) => {
  // transition is updated in VoiceDirection
  const navigation = nav.stateManager.useNavigation()
  const startpoint = navigation.startpoint
  const endpoint = navigation.endpoint

  const shortestPortal = usePortalBetween2Areas(startpoint, endpoint)
  const route = useRoute(startpoint, endpoint, shortestPortal)

  // ---------- Creation of the maps ------- //
  const interactiveMapsDispatch = useInteractiveMapsDispatch()
  const maps = useMaps(route)
  useEffect(() => {
    interactiveMapsDispatch(maps)
  }, [interactiveMapsDispatch, maps])

  // ------------------- Active Area ----------------------- //
  useNextActiveArea(route.endpoint, shortestPortal.portal)

  return (
    <>
      {children}
      <VoiceAssistant
        route={route}
        shortestPortal={shortestPortal}
        options={voiceAssistant}
      />
    </>
  )
} // React.FC Maps

export default Maps
