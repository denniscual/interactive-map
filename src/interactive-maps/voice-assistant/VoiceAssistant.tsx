import React from 'react'
import * as floors from '../floors'
import * as nav from '../navigation'
import * as wayfinder from '../wayfinder'
import { TextToSpeech } from '../speech'
import * as utils from '../__utils__'
import * as mapNodes from '../map-nodes'
import { actionTypeErrorMsg } from '../constants'
import { appSetters } from '../app-state-manager'
import * as types from '../types'
import { MapNodes, DirectionType } from '../map-nodes/types'
import { useDataSource } from '../contexts'

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

const getRandomInt = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

// NOTE: We use IIFE, Immediate Invoked Function Expression, in here so that we can isolate the
// local variables.
const generateDirectionPhrase = (() => {
  let previousRandomNumber: number | null = null
  const createPhraseWithDirection = (phrase: string) => (
    direction: DirectionType
  ) => `${phrase.trimEnd()} ${direction}.`
  const phrases = [
    // the phrase passed is incomplete. `createPhraseWithDirection` will complete the thought
    // by appending the direction.
    createPhraseWithDirection('Then just turn'),
    createPhraseWithDirection('Then turning'),
    // createPhraseWithDirection('Then Direction is turning'),
  ]
  const getPhrase = (idx: number, direction: DirectionType) =>
    phrases[idx](direction)
  return (direction: DirectionType): string => {
    let phrase = ''
    const randomNumber = Math.round(getRandomInt(0, phrases.length))
    if (!previousRandomNumber) {
      previousRandomNumber = 1
      phrase = getPhrase(previousRandomNumber, direction)
    } else {
      if (
        previousRandomNumber === randomNumber ||
        randomNumber === phrases.length
      ) {
        phrase = generateDirectionPhrase(direction)
      } else {
        previousRandomNumber = randomNumber
        phrase = getPhrase(previousRandomNumber, direction)
      }
    }

    if (!phrase) {
      phrase = generateDirectionPhrase(direction)
    }

    return phrase
  }
})()

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
      throw new Error(actionTypeErrorMsg)
    }
  }
}

/**
 * Distinguish the distance, from startpoint to endpoint, based on the length of the paths.
 * The distance is modeled by word not meter or etc. If pathsLength is empty, returned undefined
 */
const getMeasurementByDistance = (distance: number) => {
  const distances = ['After a little longer', 'After a little shorter']
  if (distance === 0) {
    return
  }
  // NOTE: Number is based in svg coordinates system.
  if (distance <= 650) {
    return distances[1]
  }
  if (distance > 650) {
    return distances[0]
  }
}

const useCreateSpeechCollection = ({
  route,
  shortestPortal,
  floorsObj,
}: {
  route: types.Route
  shortestPortal: types.ShortestPortal
  floorsObj: Record<string, types.EnhancedFloor>
}) => {
  const mapNodesDirections = mapNodes.mapNodesDirectionsStateManager.useMapNodesDirections()
  const mapNodesObj = mapNodes.mapNodesStateManager.useMapNodesObj()
  const { storeAreas } = useDataSource()
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
        const portalName = storeAreas[portalID].label.split(' ')[0]
        const nextFloorLabel = floorsObj[shortestPortal.nextFloorID].label
        const portalSpeech = `Take ${portalName} ${
          shortestPortal.portalDirection
        } to the ${nextFloorLabel}.`
        if (introSpeech) {
          return [introSpeech, portalSpeech]
        }
        return [portalSpeech]
      }
      // If route involves single floor, then the speech would only point-out
      // to the single floor.
      // E.g: You can find department 1 on the basement floor,
      // Turn right and you can find it on the left hand side
      const startpointAreaType = storeAreas[route.startpoint].type
      const endpointAreaName = storeAreas[route.endpoint].label
      let otherSpeeches: string[] = []
      const wayfinderDirections = getWayfinderDirections({
        mapNodesObj,
        mapNodesDirections,
        shortestPaths: paths,
      })
      if (wayfinderDirections && wayfinderDirections.length > 0) {
        const directionsSpeech = wayfinderDirections
          ? wayfinderDirections.map(generateDirectionPhrase)
          : []
        const lastIndex = directionsSpeech.length - 1
        // ----- For creating end speech ------- //
        const measurement = getMeasurementByDistance(distance)
        const attachedPhraseIntoLastEndPhrase =
          startpointAreaType === 'store' ? 'it' : endpointAreaName
        const lastEndPhrase = `You can find ${attachedPhraseIntoLastEndPhrase} on the ${
          wayfinderDirections[lastIndex]
        } hand side.`
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
      storeAreas,
      floorsObj,
      mapNodesDirections,
      mapNodesObj,
      route.endpoint,
      route.routeInvolvesMultipleFloors,
      route.startpoint,
      shortestPortal.nextFloorID,
      shortestPortal.portalDirection,
    ]
  )
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
      storeAreas,
      general: { voiceDirectionIsEnabled },
    } = useDataSource()

    const createSpeechCollection = useCreateSpeechCollection({
      route,
      shortestPortal,
      floorsObj,
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
            // Get the shortest paths for route and use the data for computing the direction.

            // TODO: What we gonna do in here is get the shortest path for given nodes.
            // Right now, the destination nodes is array because the nodes could be
            // possibly more than 1. If nodes.length > 1, then we need to get the
            // the node which has shortest distance. We easily do this through looping and
            // invoking the getShortestPathsForRoute. So why we are doing this? Because some areas
            // has many doors. So its good to point to the customer what would be the nearest door
            // from its location.
            const { paths, distance } = getShortestPathsForRoute(
              {
                ...route,
                startpoint: storeAreas[route.startpoint].nodes[0],
                endpoint: storeAreas[route.endpoint].nodes[0],
              },
              routeFloor.graphAndNodes.mapGraph
            ) as { paths: string[]; distance: number | 'Infinity' }
            // If the distance is Infinity, it means that the graph doesnt include the nodes involve in navigation.
            if (distance === 'Infinity') {
              throw utils.createError(
                'Error caught while creating a wayfinder paths. Make sure that the startpoint and endpoint nodes are included into active map graph.'
              )
            }

            // Update the shortest paths so that we can access the shortest paths inside Wayfinder.
            appSetters.shortestPaths.setShortestPaths(paths)

            // ----------- Speech Collection ------------- //
            const endArea = storeAreas[endpointID].label
            const introSpeech = `You can find ${endArea} on the ${
              activeFloor.label
            }.`
            const speeches = createSpeechCollection({
              paths,
              introSpeech,
              distance,
            })
            setSpeechCollection(speeches)
            setWayfinderDistance(distance)
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
      ]
    )

    React.useEffect(
      function subscribeToWayfinder() {
        const endSubscription = wayfinderObservables.end.subscribe(() => {
          // We only need to tell the interactive-maps that the wayfinder is already
          // finished if and only if we don't yet reach the destination floor.
          // If we already reach the destination floor, no need to tell it.
          if (endpoint.floorID !== route.floorID) {
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
          const { paths, distance } = getShortestPathsForRoute(
            route,
            routeFloor.graphAndNodes.mapGraph
          ) as { paths: string[]; distance: number | 'Infinity' }
          // If the distance is Infinity, it means that the graph doesnt include the nodes involve in navigation.
          if (distance === 'Infinity') {
            throw utils.createError(
              'Error caught while creating a wayfinder paths. Make sure that the startpoint and endpoint nodes are included into active map graph.'
            )
          }
          appSetters.shortestPaths.setShortestPaths(paths)
          // ----------- Speech Collection ------------- //
          const speeches = createSpeechCollection({ paths, distance })
          setSpeechCollection(speeches)
          setWayfinderDistance(distance)
          speechAndWayfinderStatusDispatch('RESET')
        }
      },
      [
        createSpeechCollection,
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
