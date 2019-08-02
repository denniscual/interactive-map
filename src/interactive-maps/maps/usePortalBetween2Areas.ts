import { useMemo } from 'react'
import { sort } from 'ramda'
import * as floors from '../floors'
import { getShortestPaths } from '../__utils__'
import * as types from '../types'

/**
 * Getting the next floor ID. It is used if no direct portal, e.g elevator, is used
 * to go in destination floor like escalator.
 */
const getNextFloorIDAndPortalDirection = (
  mapFloors: types.EnhancedFloors,
  startpointFloorID: string,
  endpointFloorID: string
) => {
  const startpointFloorIDIndex = mapFloors.findIndex(
    floor => floor.id === startpointFloorID
  )
  const endpointFloorIDIndex = mapFloors.findIndex(
    floor => floor.id === endpointFloorID
  )
  // Negate so that flow would start 'UP' rather than 'DOWN'
  if (!(startpointFloorIDIndex - endpointFloorIDIndex > 0)) {
    // Increment the startpoint.floorIDIndex. Direction is 'UP'
    return {
      portalDirection: 'UP' as const,
      nextFloorID: mapFloors[startpointFloorIDIndex + 1].id,
    }
  } else {
    // Decrement the startpoint.floorIDIndex. Direction is 'DOWN'
    return {
      portalDirection: 'DOWN' as const,
      nextFloorID: mapFloors[startpointFloorIDIndex - 1].id,
    }
  }
}

/**
 * Getting the same portal in both startpoint and endpoint floors.
 */
const getSamePortals = ({
  startpointFloorID,
  endpointFloorID,
  mapFloorsObj,
}: {
  startpointFloorID: string
  endpointFloorID: string
  mapFloorsObj: types.EnhancedFloorsObj
}) => {
  // startpoint and endpoint portals
  const startpointFloor = mapFloorsObj[startpointFloorID]
  const endpointFloor = mapFloorsObj[endpointFloorID]

  let samePortals: types.Portals = []
  // Finding portals which occurs in both startpoint and endpoint.
  startpointFloor.portals.forEach(portal => {
    // Check if the startpoint portal is exist in endpointPortals.
    const foundPortal = endpointFloor.portals.find(
      innerPortal =>
        // If oneWay, we only need to include portal where its portal.directionPoint
        // is 'ENTRY' not 'EXIT
        ((innerPortal.type === 'oneWay' && portal.directionPoint === 'ENTRY') ||
          innerPortal.type === 'twoWay') &&
        innerPortal.id === portal.id
    )

    if (foundPortal) {
      samePortals.push(foundPortal)
    }
  })
  return samePortals
}

/**
 * A recursive function which creates shortest portal given the startpoint and endpoint.
 */
const createShortestPortal = ({
  startpointPath,
  startpointFloorID,
  endpointFloorID,
  mapFloorsObj,
  mapFloorsArr,
  mapGraph,
}: {
  startpointPath: string
  startpointFloorID: string
  endpointFloorID: string
  mapFloorsObj: types.EnhancedFloorsObj
  mapFloorsArr: types.EnhancedFloors
  mapGraph: any // FIXME: Fix this type. Don't use any type.
  portalDirection?: 'UP' | 'DOWN'
}): types.ShortestPortal => {
  if (startpointFloorID && endpointFloorID) {
    const { portalDirection, nextFloorID } = getNextFloorIDAndPortalDirection(
      mapFloorsArr,
      startpointFloorID,
      endpointFloorID
    )
    const samePortals = getSamePortals({
      startpointFloorID,
      endpointFloorID,
      mapFloorsObj,
    })
    // Check if the samePortals is not empty. If not empty, there is portal used either elevator
    // or escalator.
    if (samePortals.length > 0) {
      // Loop to portals to create an array where each portal has equivalent distance based in
      // startpoint
      const enhancedPortals = samePortals.map(portal => {
        // Getting the short route path from startpoint.path to portal
        const { distance } = getShortestPaths(
          mapGraph,
          startpointPath,
          portal.id
        )
        return {
          id: portal.id,
          type: portal.type,
          distance: distance as number,
        }
      })
      // Sort the portals based in distance in ascending order (small to big)
      const portalsByShortestDistance = sort(
        (portal, comparedPortal) => portal.distance - comparedPortal.distance,
        enhancedPortals
      )
      // get the head to get the portal with shortest distance
      // Firstly, we gonna check if there is portal
      if (portalsByShortestDistance[0]) {
        const portalWithShortestDistance = portalsByShortestDistance[0]
        return {
          portal: portalWithShortestDistance.id,
          portalDirection: portalDirection,
          type: portalWithShortestDistance.type,
          nextFloorID: endpointFloorID,
        }
      }
    } else {
      // Else, samePortals is empty. It means that going from startpoint to endpoint,
      // no portal machine can be used. No direct routing.
      // What we gonna do is to create an indirect routing. Means that we gonna go to
      // other floors just to go to the destination floor.
      // In creating indirect routing, we need to know the next floor to be used.
      return createShortestPortal({
        startpointPath,
        startpointFloorID,
        endpointFloorID: nextFloorID,
        mapFloorsArr,
        mapFloorsObj,
        mapGraph,
        portalDirection,
      })
    }
  }
  return {
    portal: '',
    portalDirection: '',
    type: '',
    nextFloorID: '',
  }
}

/**
 * Getting the shortest route portal between 2 areas.
 */

const usePortalBetween2Areas = (
  startpoint: types.Node,
  endpoint: types.Node
): types.ShortestPortal => {
  // Create startpoint graph
  // Getting the floor nodes and create a graph based in nodes..
  const mapFloorsArr = floors.stateManager.useFloors()
  const mapFloors = floors.stateManager.useFloorsToObj()
  const givenFloor = mapFloors[startpoint.floorID as string]
  // If givenFloor is defined, we gonna assign its nodes.
  const startpointFloorNodes = givenFloor
    ? givenFloor.graphAndNodes
    : // This is just an escape hatch. We can do better for this
      // solution because this creates un-necessary computation in creating graph :)
      mapFloors['defaultFloor'].graphAndNodes
  const { mapGraph } = startpointFloorNodes
  return useMemo(() => {
    if (
      startpoint.floorID !== endpoint.floorID && // when the floor is not the same.
      (startpoint.floorID && endpoint.floorID) // startpoint and endpoint floorID is defined.
    ) {
      // creating shortest portal
      return createShortestPortal({
        startpointPath: startpoint.id,
        startpointFloorID: startpoint.floorID,
        endpointFloorID: endpoint.floorID,
        mapFloorsObj: mapFloors,
        mapFloorsArr,
        mapGraph,
      })
    }

    return {
      portal: '',
      portalDirection: '',
      type: '',
      nextFloorID: '',
    }
  }, [
    startpoint.floorID,
    startpoint.id,
    endpoint.floorID,
    mapFloors,
    mapFloorsArr,
    mapGraph,
  ])
}

export default usePortalBetween2Areas
