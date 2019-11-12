import React from 'react'
import * as floors from '../floors'
import * as nav from '../navigation'
import * as wayfinder from '../wayfinder'
import { TextToSpeech } from '../speech'
import * as utils from '../__utils__'
import * as mapNodes from '../map-nodes'
import { ACTION_ERROR_TYPE } from '../constants'
import { appSetters, useAppSelector, appUtils } from '../app-state-manager'
import * as types from '../types'
import { MapNodes, DirectionType } from '../map-nodes/types'
import { useDataSource } from '../contexts'
import { useTranslate, getDefaultLanguage } from '../translations'

interface MapTranslate {
  (key: string, data?: Record<string, string>): string
}

/**
 * Translate which has default language set.
 */
const useMapTranslate = () => {
  const translate = useTranslate()
  return React.useCallback(
    (key: string, data?: Record<string, string>) => {
      return translate(key, {
        data,
        defaultLang: getDefaultLanguage(),
      })
    },
    [translate]
  )
}

const getShortestPathsForRoute = (
  route: types.EnhancedNavigation,
  mapGraph: types.MapGraph
): { paths: unknown; distance: unknown } => {
  return utils.getShortestPaths(mapGraph, route.startpoint, route.endpoint)
}

const getWayfinderDirections = ({
  mapNodesObj,
  mapNodesDirections,
  shortestPaths,
}: {
  mapNodesObj: types.MapNodesObj
  mapNodesDirections: MapNodes
  shortestPaths: string[]
}) => {
  // We need to map the shortestPaths. shotestPaths nodes are using ID wherein the directions
  // are using keyID. Because of this, we have compatibility issue. To resolve this,
  // we gonna map the shortestPaths and use the keyID instead.
  const shortestPathsThatUsesKeyID = shortestPaths.map(path => {
    const node = mapNodesObj[path]
    if (node) {
      return node['data-key-id']
    }
  })
  if (shortestPathsThatUsesKeyID.length > 0) {
    const wayfinderDirections = shortestPathsThatUsesKeyID
      // path is node internally
      .map(path => {
        if (path) {
          const nodeWithDirections = mapNodesDirections.get(path)
          if (nodeWithDirections) {
            let foundDirection: DirectionType | null = null
            const directionsEntries = nodeWithDirections.entries()
            // If we can find a direction, we gonna break it immediately. Why? because we are only supporting one-way navigation. Means
            // that the found direction is the only direction use in wayfinder which is included to given base node. Theres no other direction.
            // It will have if we support circular navigation, going back-en-forth. But right now, we did'nt.
            for (const [nodes, direction] of directionsEntries) {
              // Direction has 2 nodes. We need to check if these nodes are included in wayfinder nodes and also their order. Means
              // that the order of directions are essential. We gonna use the direction if the nodes included are also included in
              // wayfinder and also the sorting order of the nodes direction is equal to sorting order of the wayfinder nodes.
              // E.g:
              // Given data:
              // direction = ['node1', 'node3']
              // wayfinder = ['node1', 'node2', 'node3']
              // directionCanBeUsed = true
              // Explanation: The nodes of direction is included in wayfinder and the sorting order is the same.
              //
              // Given data:
              // direction = ['node3', 'node1']
              // wayfinder = ['node1', 'node2', 'node3']
              // directionCanBeUsed = false
              // Explanation: The nodes of direction is included in wayfinder and but the sorting order is not the same. So it is false.
              //
              // Formula: directionCanBeUsed = directionNodesAreIncluded && sortingAreTheSame ? true : false

              const foundIndex = shortestPathsThatUsesKeyID.findIndex(
                innerNode => innerNode === nodes[0]
              )
              if (foundIndex > -1) {
                const nodeIsIncluded = shortestPathsThatUsesKeyID
                  // we need to extract the remaining elements in the array which did'nt include
                  // in the first iteration. we do this using the foundIndex then slicing
                  // the array beginning to foundIndex + 1, we need to add 1 so that
                  // the found element will not be included, upto the rest elements.
                  // The idea in here is that we have 2 iterations. First iteration is to check
                  // whether the first node is included on the array, then check the next node
                  // if it is included on the remaining array. We need to do this to ensure that the nodes
                  // are not only included in the wayfinder nodes but their sorts are also the same.
                  .slice(foundIndex + 1)
                  .includes(nodes[1])
                if (nodeIsIncluded) {
                  foundDirection = direction
                  break
                } else {
                  foundDirection = null
                }
              }
            }
            return foundDirection
          }
          return null
        }
      })
      .filter(Boolean) as DirectionType[]
    return wayfinderDirections
  }
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Voice direction and wayfinder speechAndWayfinderStatus state
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

type StatusAction =
  | 'SPEECH_COLLECTION_FINISHED'
  | 'WAYFINDER_FINISHED'
  | 'SPEECH_COLLECTION_AND_WAYFINDER_ARE_FINISHED'
  | 'RESET'

type StatusState = {
  speechCollectionIsFinished: boolean
  wayfinderCollectionIsFinished: boolean
  speechCollectionAndWayfinderAreFinished: boolean
}

const initStatusState: StatusState = {
  speechCollectionIsFinished: false,
  wayfinderCollectionIsFinished: false,
  speechCollectionAndWayfinderAreFinished: false,
}

const speechAndWayfinderStatusReducer = (
  state: StatusState,
  action: StatusAction
): StatusState => {
  switch (action) {
    case 'SPEECH_COLLECTION_FINISHED': {
      return {
        ...state,
        speechCollectionIsFinished: true,
      }
    }
    case 'WAYFINDER_FINISHED': {
      return {
        ...state,
        wayfinderCollectionIsFinished: true,
      }
    }
    case 'SPEECH_COLLECTION_AND_WAYFINDER_ARE_FINISHED': {
      return {
        ...initStatusState,
        speechCollectionAndWayfinderAreFinished: true,
      }
    }
    case 'RESET': {
      return initStatusState
    }
    default: {
      throw new Error(ACTION_ERROR_TYPE)
    }
  }
}

/**
 * Distinguish the distance, from startpoint to endpoint, based on the length of the paths.
 * The distance is modeled by word not meter or etc. If pathsLength is empty, returned undefined
 */
const getMeasurementByDistance = (
  distance: number,
  translate: MapTranslate
) => {
  if (distance === 0) {
    return
  }
  // NOTE: Number is based in svg coordinates system.
  if (distance <= 800) {
    return translate('measurements.shorter')
  }
  if (distance > 800) {
    return translate('measurements.longer')
  }
}

const useCreateSpeechCollection = ({
  storeAreas,
  route,
  shortestPortal,
  floorsObj,
  translate,
}: {
  storeAreas: types.StoreAreas
  route: types.Route
  shortestPortal: types.ShortestPortal
  floorsObj: Record<string, types.EnhancedFloor>
  translate: MapTranslate
}) => {
  const mapNodesDirections = mapNodes.mapNodesDirectionsStateManager.useMapNodesDirections()
  const mapNodesObj = mapNodes.mapNodesStateManager.useMapNodesObj()

  // The initial speech collection is depending on the type of route.
  return React.useCallback(
    ({
      paths,
      introSpeech,
      distance,
    }: {
      paths: string[]
      introSpeech?: string
      distance: number
    }) => {
      // If route invovles multiple floors, then the speech would involve portals
      // and some direction.
      // E.g: Take escalator up to the ground floor then to the left. After turning right,
      // you can find it on the right hand side.
      if (route.routeInvolvesMultipleFloors) {
        const portalID = route.endpoint
        const portalName = translate(storeAreas[portalID].id)
        const nextFloorLabel = floorsObj[shortestPortal.nextFloorID].label
        // const portalSpeech = `Take ${portalName} ${shortestPortal.portalDirection} to the ${nextFloorLabel}.`;
        const portalSpeech = translate('portalSpeech', {
          portalName,
          portalDirection: shortestPortal.portalDirection,
          floorLabel: nextFloorLabel,
        })
        if (introSpeech) {
          return [introSpeech, portalSpeech]
        }
        return [portalSpeech]
      }
      // If route involves single floor, then the speech would only point-out
      // to the single floor.
      // E.g: You can find department 1 on the basement floor,
      // Turn right and you can find it on the left hand side
      let otherSpeeches: string[] = []
      const wayfinderDirections = getWayfinderDirections({
        mapNodesObj,
        mapNodesDirections,
        shortestPaths: paths,
      })
      if (wayfinderDirections && wayfinderDirections.length > 0) {
        const directionsSpeech = wayfinderDirections
          ? wayfinderDirections.map(direction =>
              translate('whileWalking', {
                direction: translate(`directions.${direction}`),
              })
            )
          : []
        const lastIndex = directionsSpeech.length - 1
        // ----- For creating end speech ------- //
        const measurement = getMeasurementByDistance(distance, translate)
        // const attachedPhraseIntoLastEndPhrase =
        //   startpointAreaType === 'store' ? 'it' : endpointAreaName;
        // const lastEndPhrase = `You can find the area on the ${wayfinderDirections[lastIndex]} hand side.`;
        const lastEndPhrase = translate('arrivingToDestination', {
          direction: translate(`directions.${wayfinderDirections[lastIndex]}`),
        })
        let endSpeech = ''
        if (distance) {
          endSpeech = `${measurement}, ${lastEndPhrase}`
        } else {
          endSpeech = lastEndPhrase
        }
        // ----- For creating next speeches ------- //
        const nextSpeeches = directionsSpeech.slice(0, lastIndex)
        // We need to check if the nextSpeeches is empty or not.
        // If not empty, we gonna get the first element and use it to otherSpeeches. Why
        // first element? We only need to use the first direction in the nextSpeeches because
        // our end speech is based on that direction not in succeeding direction.
        if (nextSpeeches.length > 0) {
          otherSpeeches = [nextSpeeches[0], endSpeech]
        }
        // Else, if the nextSpeeches is empty, we only need endSpeech for otherSpeeches.
        else {
          otherSpeeches = [endSpeech]
        }
      }
      if (introSpeech) {
        return [introSpeech, ...otherSpeeches]
      }
      return [...otherSpeeches]
    },
    [
      translate,
      storeAreas,
      floorsObj,
      mapNodesDirections,
      mapNodesObj,
      route.endpoint,
      route.routeInvolvesMultipleFloors,
      shortestPortal.nextFloorID,
      shortestPortal.portalDirection,
    ]
  )
}

// TODO: Need to think if this would be the great name for this
// because this name is already used.
interface ShortestPath {
  paths: string[]
  distance: number | 'Infinity'
}

const getShortestPathBasedOnTheAreas = ({
  storeAreas,
  route,
  mapGraph,
}: {
  storeAreas: types.StoreAreas
  route: types.Route
  mapGraph: types.MapGraph
}): ShortestPath => {
  const startpointAreaNodeID = storeAreas[route.startpoint].nodes[0]
  const { nodes: endpointAreaNodes } = storeAreas[route.endpoint]
  return endpointAreaNodes
    .map(node => {
      return getShortestPathsForRoute(
        {
          ...route,
          startpoint: startpointAreaNodeID,
          endpoint: node,
        },
        mapGraph
      ) as ShortestPath
    })
    .sort((shortestPath, comparedShortestPath) => {
      if (
        shortestPath.distance === 'Infinity' ||
        comparedShortestPath.distance === 'Infinity'
      ) {
        throw utils.createError(
          new Error(
            'Error caught while creating a wayfinder paths. Make sure that the startpoint and endpoint nodes are included into active map graph.'
          )
        )
      }
      return shortestPath.distance - comparedShortestPath.distance
    })[0]
}

const VoiceAssistant: React.FC<{
  options?: types.VoiceAssistantModifier
  route: types.Route
  shortestPortal: types.ShortestPortal
  onAudioPlay?: (phrase?: string) => {}
}> = React.memo(
  ({ route, shortestPortal, onAudioPlay = () => {}, options }) => {
    const [wayfinderDistance, setWayfinderDistance] = React.useState(0)
    const [speechCollection, setSpeechCollection] = React.useState<
      ReadonlyArray<string>
    >([])
    const [
      speechAndWayfinderStatus,
      speechAndWayfinderStatusDispatch,
    ] = React.useReducer(speechAndWayfinderStatusReducer, initStatusState)
    const navigationDispatch = nav.stateManager.useNavigationDispatch()
    const { welcomeSpeech } = appSetters
    const { endpoint } = nav.stateManager.useNavigation()
    const endpointID = endpoint.id
    const floorsObj = floors.stateManager.useFloorsToObj()
    const _floors = floors.stateManager.useFloors()
    const routeFloor = floors.stateManager.useGetFloorByID(route.floorID || '')
    const activeFloor = floorsObj[endpoint.floorID || '']
    const { setID: setActiveFloorID } = appSetters.activeFloor
    const navigationObservable = nav.useNavigationObservable()
    const wayfinderObservables = wayfinder.useWayfinderObservables()
    const mapNodesDispatch = mapNodes.mapNodesStateManager.useMapNodesDispatch()
    const {
      general: { voiceDirectionIsEnabled },
    } = useDataSource()
    const storeAreas = useAppSelector(appUtils.getStoreAreas)
    const translate = useMapTranslate()

    const createSpeechCollection = useCreateSpeechCollection({
      storeAreas,
      route,
      shortestPortal,
      floorsObj,
      translate,
    })

    const audioDelay = React.useCallback(() => wayfinderDistance, [
      wayfinderDistance,
    ])

    React.useEffect(() => {
      if (route.endpoint === '') {
        setSpeechCollection([])
      }
    }, [route.endpoint])

    React.useEffect(
      function subscribeToNewNavigation() {
        // only execute the computation if the observable type is 'new'
        const subscription = navigationObservable.subscribe(({ type }) => {
          if (type === 'new') {
            speechAndWayfinderStatusDispatch('RESET')
            // For speech
            welcomeSpeech.setStatus(false)

            // ----------- Shortest Paths ------------- //

            const shortestPath = getShortestPathBasedOnTheAreas({
              storeAreas,
              route,
              mapGraph: routeFloor.graphAndNodes.mapGraph,
            })

            // Update the shortest paths so that we can access the shortest paths inside Wayfinder.
            appSetters.shortestPaths.setShortestPaths(shortestPath.paths)

            // ----------- Speech Collection ------------- //
            // If no value was specified on a given language, default it to English.
            const introSpeech = translate('startWalking', {
              area: translate(endpointID),
              floorLabel: activeFloor.label,
            })

            const speeches = createSpeechCollection({
              paths: shortestPath.paths,
              introSpeech,
              distance: shortestPath.distance as number,
            })
            setSpeechCollection(speeches)
            setWayfinderDistance(shortestPath.distance as number)
          }
        })
        return function effectCleanup() {
          subscription.unsubscribe()
        }
      },
      [
        storeAreas,
        activeFloor,
        createSpeechCollection,
        endpointID,
        navigationObservable,
        route,
        routeFloor.graphAndNodes.mapGraph,
        welcomeSpeech,
        translate,
      ]
    )

    React.useEffect(
      function subscribeToWayfinder() {
        const endSubscription = wayfinderObservables.end.subscribe(e => {
          const srcElement = e.srcElement as {
            id?: string
          } | null
          // We only need to tell the interactive-maps that the wayfinder is already
          // finished if and only if we don't yet reach the destination floor.
          // If we already reach the destination floor, no need to tell it.
          if (
            srcElement &&
            srcElement.id &&
            srcElement.id === 'wayfinder' &&
            endpoint.floorID !== route.floorID
          ) {
            speechAndWayfinderStatusDispatch('WAYFINDER_FINISHED')
          }
        })

        return () => {
          endSubscription.unsubscribe()
        }
      },
      [endpoint.floorID, route.floorID, wayfinderObservables.end]
    )

    React.useEffect(
      function settingNavigationStartingPoint() {
        if (
          (speechAndWayfinderStatus.speechCollectionIsFinished &&
            speechAndWayfinderStatus.wayfinderCollectionIsFinished) ||
          (!voiceDirectionIsEnabled &&
            speechAndWayfinderStatus.wayfinderCollectionIsFinished)
        ) {
          const startpointArea = storeAreas[shortestPortal.portal]
          navigationDispatch({
            type: 'START_POINT',
            payload: {
              ...startpointArea,
              floorID: shortestPortal.nextFloorID,
            },
          })
          // Transition to next floor
          const activeFloorID = shortestPortal.nextFloorID
          setActiveFloorID(activeFloorID)
          // create map nodes object
          const mapNodesObj = utils.nodes.createMapNodesObj(
            _floors,
            activeFloorID
          )
          // Update the map nodes
          mapNodesDispatch({ type: 'ADD_NODES', payload: mapNodesObj })
          speechAndWayfinderStatusDispatch(
            'SPEECH_COLLECTION_AND_WAYFINDER_ARE_FINISHED'
          )
        }
      },
      [
        storeAreas,
        navigationDispatch,
        shortestPortal.nextFloorID,
        shortestPortal.portal,
        speechAndWayfinderStatus.speechCollectionIsFinished,
        speechAndWayfinderStatus.wayfinderCollectionIsFinished,
        voiceDirectionIsEnabled,
        mapNodesDispatch,
        _floors,
        setActiveFloorID,
      ]
    )

    // If the user nav involves multiple floors, we need to create
    // a new speechCollection. Why? Because speechCollection is basically based
    // in every floor. So the first speechCollection is coming from startpoint floor.
    // Then next speechCollection is coming to next floor and so on until it reaches the
    // last floor which basically the destination floor.
    React.useEffect(
      // NOTE: In this callback, we can access the next route. Therefore, this is the
      // perfect function to create the next speech collection.
      // NOTE: Another note is that the computation of this effect will only use if the route
      // involves multiple floors. If not, the computation will not run.
      function settingNextSpeechCollection() {
        if (speechAndWayfinderStatus.speechCollectionAndWayfinderAreFinished) {
          // ----------- Shortest Paths ------------- //
          // We gonna create here the speech collection use for next floor. Map nodes has directions
          // and we gonna use those directions for speech collection
          // Get the shortest paths for route and use the data for computing the direction.
          const { paths, distance } = getShortestPathBasedOnTheAreas({
            storeAreas,
            route,
            mapGraph: routeFloor.graphAndNodes.mapGraph,
          })
          appSetters.shortestPaths.setShortestPaths(paths)
          // ----------- Speech Collection ------------- //
          const speeches = createSpeechCollection({
            paths,
            distance: distance as number,
          })
          setSpeechCollection(speeches)
          setWayfinderDistance(distance as number)
          speechAndWayfinderStatusDispatch('RESET')
        }
      },
      [
        createSpeechCollection,
        storeAreas,
        route,
        routeFloor.graphAndNodes.mapGraph,
        speechAndWayfinderStatus.speechCollectionAndWayfinderAreFinished,
      ]
    )

    // This handler would show the wayfinder.
    const handleFirstAudioEnded = React.useCallback(() => {
      welcomeSpeech.setStatus(true)
    }, [welcomeSpeech])

    const handleAudioCollectionEnded = React.useCallback(() => {
      setSpeechCollection([])
      speechAndWayfinderStatusDispatch('SPEECH_COLLECTION_FINISHED')
    }, [])

    // This handler is a fallback if the generation of speech takes too long based in given timeout.
    // If this handler gets invoke, we need to dispatch the welcomeSpeech and speechAndWayfinderStatus so that
    // our maps would continue running even though that app encounters an internet issue.
    const handleAudioTimeout = React.useCallback(() => {
      welcomeSpeech.setStatus(true)
      speechAndWayfinderStatusDispatch('SPEECH_COLLECTION_FINISHED')
    }, [welcomeSpeech])

    return voiceDirectionIsEnabled ? (
      <TextToSpeech
        collection={speechCollection}
        onFirstAudioEnded={handleFirstAudioEnded}
        onAudioCollectionEnded={handleAudioCollectionEnded}
        audioDelay={audioDelay}
        options={options}
        onAudioTimeout={handleAudioTimeout}
      />
    ) : null
  }
)

export default VoiceAssistant
