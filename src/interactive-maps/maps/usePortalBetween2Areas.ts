import { useMemo } from 'react'
import { sort } from 'ramda'
import * as floors from '../floors'
import { getShortestPaths, createError } from '../__utils__'
import { useAppSelector, appUtils } from '../app-state-manager'
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
      portalDirection: 'up' as const,
      nextFloorID: mapFloors[startpointFloorIDIndex + 1].id,
    }
  } else {
    // Decrement the startpoint.floorIDIndex. Direction is 'DOWN'
    return {
      portalDirection: 'down' as const,
      nextFloorID: mapFloors[startpointFloorIDIndex - 1].id,
    }
  }
}

/**
 * Getting the same portal in both startpoint and endpoint floors.
 * Portal is returning an `areaID` not `nodeID`.
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
 * TODO: We need to handle some internals data to prevent the `recursive error`.
 * Instead of leaving the possibility of the error, we will just throw an error.
 */
const createShortestPortal = ({
  startpointArea,
  startpointFloorID,
  endpointFloorID,
  mapFloorsObj,
  mapFloorsArr,
  mapGraph,
  storeAreas,
}: {
  startpointArea: string
  startpointFloorID: string
  endpointFloorID: string
  mapFloorsObj: types.EnhancedFloorsObj
  mapFloorsArr: types.EnhancedFloors
  mapGraph: any // FIXME: Fix this type. Don't use any type.
  portalDirection?: 'up' | 'down'
  storeAreas: types.StoreAreas
}): types.ShortestPortal => {
  if (startpointFloorID && endpointFloorID) {
    const { portalDirection, nextFloorID } = getNextFloorIDAndPortalDirection(
      mapFloorsArr,
      startpointFloorID,
      endpointFloorID
    )
    // TODO: getSamePortals will also returned the `nodeID`. Right now,
    // it only returned the `areaID`.
    const samePortals = getSamePortals({
      startpointFloorID,
      endpointFloorID,
      mapFloorsObj,
    })
    // Check if the samePortals is not empty. If not empty, there is portal used either elevator
    // or escalator.
    if (samePortals.length > 0) {
      // Loop to portals to create an array where each portal has distance based in
      // startpoint
      const enhancedPortals = samePortals.map(portal => {
        // Portal area must only have 1 node.
        // This should be a `device` or another `portal` area which only have
        // 1 node.
        const startpointNode = storeAreas[startpointArea].nodes[0]
        const portalAreaNode = storeAreas[portal.id].nodes[0]
        // Getting the short route path from startpoint.path to portal
        const { distance } = getShortestPaths(
          mapGraph,
          startpointNode,
          portalAreaNode
        ) as {
          paths: string[]
          distance: number | 'Infinity'
        }
        return {
          id: portal.id,
          type: portal.type,
          distance: distance as number | 'Infinity',
        }
      })

      // Sort the portals based in distance in ascending order (small to big)
      const portalsByShortestDistance = sort((portal, comparedPortal) => {
        if (
          portal.distance === 'Infinity' ||
          comparedPortal.distance === 'Infinity'
        ) {
          throw createError(
            new Error(
              'Error caught while creating a wayfinder paths. Make sure that the startpoint and endpoint nodes are included into active map graph.'
            )
          )
        }
        return portal.distance - comparedPortal.distance
      }, enhancedPortals)
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
        startpointArea,
        startpointFloorID,
        endpointFloorID: nextFloorID,
        mapFloorsArr,
        mapFloorsObj,
        mapGraph,
        portalDirection,
        storeAreas,
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
 * Getting the shortest route portal area between 2 areas.
 */
const usePortalBetween2Areas = (
  startpoint: types.StoreArea,
  endpoint: types.StoreArea
): types.ShortestPortal => {
  // Create startpoint graph
  // Getting the floor nodes and create a graph based in nodes..
  const mapFloorsArr = floors.stateManager.useFloors()
  const mapFloors = floors.stateManager.useFloorsToObj()
  const givenFloor = mapFloors[startpoint.floorID as string]
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  // If givenFloor is defined, we gonna assign its nodes.
  const startpointFloorNodes = givenFloor
    ? givenFloor.graphAndNodes
    : // This is just an escape hatch. We can do better for this
      // solution because this creates un-necessary computation in creating graph :)
      mapFloors['defaultFloor'].graphAndNodes
  const { mapGraph } = startpointFloorNodes
  return useMemo(() => {
    if (
      startpoint.floorID &&
      endpoint.floorID &&
      startpoint.floorID !== endpoint.floorID // when the floor is not the same.
      // startpoint and endpoint floorID is defined.
    ) {
      // creating shortest portal
      return createShortestPortal({
        startpointArea: startpoint.id,
        startpointFloorID: startpoint.floorID,
        endpointFloorID: endpoint.floorID,
        mapFloorsObj: mapFloors,
        mapFloorsArr,
        mapGraph,
        storeAreas,
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
    storeAreas,
  ])
}

export default usePortalBetween2Areas
