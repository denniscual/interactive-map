import React, { useMemo, Children } from 'react'
import { values, curry } from 'ramda'
import * as maps from './maps'
import * as floors from './floors'
import * as nav from './navigation'
import * as areas from './areas'
import { appSetters } from './app-state-manager'
import {
  mapNodesStateManager,
  mapNodesDirectionsStateManager,
} from './map-nodes'
import * as utils from './__utils__'
import { MapNodeDirections } from './map-nodes/types'
import * as types from './types'

const createAreas: (
  entities: types.Entity[],
  areaType: types.AreaTypes
) => types.AreasObj = (entities, areaType) => {
  return entities
    .map(entity => ({
      label: entity.label,
      value: {
        id: entity.id,
        type: areaType,
        // assure that the entity.areaID in here is already defined.
        areaID: entity.areaID as string,
        floorID: entity.floorID,
      },
    }))
    .reduce(
      (acc, value) => ({
        ...acc,
        [value.value.id]: value,
      }),
      {} as types.AreasObj
    )
} // Function createArea

const createStoresForFloor = curry((stores: types.Entity[], floorID: string) =>
  stores
    .filter(store => store.floorID === floorID)
    .map(filteredStore => filteredStore.id)
) // Curried createStoresForFloor

const parseOriginalFloors = (floors: types.OriginalFloor[]): types.Floors =>
  floors.map(floor => ({
    ...floor,
    graphAndNodes: utils.createMapGraphAndMapNodes(floor.nodes.props.children),
    nodesDirections: utils.createNodesDirections(floor.nodesDirections),
  }))

/**
 * Creating interactive map based in given floors, stores, and portals.*
 * These data are passed by the CMS in the future.
 */
const useDataSourceForInteractiveMap = (
  dataSource: types.InteractiveMapsDataSource
): {
  floors: types.EnhancedFloors
  floorsObj: types.EnhancedFloorsObj
  areas: types.Areas
  areasObj: types.AreasObj
} => {
  const { general, floors: originalFloors, stores, portals } = dataSource
  const { activeArea } = appSetters

  const floors = parseOriginalFloors(originalFloors)

  return useMemo(() => {
    const storesArr = values(stores)
    const portalsArr = values(portals)

    // --------- Define Areas --------- //
    const portalAreasObj: types.AreasObj = createAreas(portalsArr, 'portal')
    const storeAreasObj: types.AreasObj = createAreas(storesArr, 'store')
    // general areas
    const areasObj: types.AreasObj = {
      ...storeAreasObj,
      ...portalAreasObj,
    }
    // Transforming areas object into area array
    const mapAreas = values(areasObj)

    const createStores = createStoresForFloor(storesArr)

    // --------- Define Floors --------- //
    const enhancedFloors: types.EnhancedFloors = floors.map(floor => {
      const areasJSXElements = utils.mapElements.parseToReactElements(
        floor.map,
        activeArea.setID
      )
      return {
        ...floor,
        stores: createStores(floor.id),
        Map: maps.createMapComponent(
          // Data use for creating the map
          {
            elements: areasJSXElements,
            nodes: floor.nodes,
            props: utils.mapElements.getSVGRootProps(floor.map),
            // If the floor map has its own css styles, use it. Else, use the general
            // map css
            css: floor.mapCSS || general.mapCSS,
            floorID: floor.id,
          },
          // Modifiers, use for enabling or disabling map features like map-editor.
          {
            nodesVisible: general.isNodesVisible,
            mapEditorVisible: general.isMapEditorVisible,
            voiceDirectionIsEnabled: general.voiceDirectionIsEnabled,
          }
        ),
        navigation: {
          startpoint: areasObj[floor.navigation.startpoint],
          endpoint: {
            label: '',
            value: {
              id: '',
              type: '',
              areaID: '',
              floorID: floor.id,
            } as types.Node,
          },
        },
        nodes: floor.nodes.props.children,
      }
    })
    const addedFloors = enhancedFloors.concat({
      ...enhancedFloors[0],
      id: 'defaultFloor',
    })
    // Transforming floor area into floors object.
    const floorsObj: types.EnhancedFloorsObj = addedFloors.reduce(
      (acc, value) => ({
        ...acc,
        [value.id]: value,
      }),
      {} as types.EnhancedFloorsObj
    )

    return {
      floors: addedFloors,
      floorsObj,
      areas: mapAreas,
      areasObj,
    }
  }, [stores, portals, floors, activeArea.setID, general])
} // Function createDataForInteractiveMap

const useDefaultNav = (
  mapAreas: types.Areas,
  defaultStartingPoint: string
): types.Navigation =>
  React.useMemo(() => {
    const startpoint = mapAreas.find(
      area => area.value.id === defaultStartingPoint
    )
    if (startpoint) {
      const endpoint = {
        label: '',
        value: {
          id: '',
          type: '',
          areaID: '',
          floorID: startpoint.value.floorID,
        } as types.Node,
      }
      return {
        startpoint,
        endpoint,
      }
    }
    // If startpoint is undefined, throw an error.
    throw utils.createError(
      'Failed to create default navigation. Try to check the used syntax for the value of the provided LOCATION environment variable. Syntax should be `id__angle`. Maybe you add more than 2 underscore characters? Make it only 2. If syntax is correct, check the provided `id`. Maybe the `id` is incorrect or have a typo.'
    )
  }, [defaultStartingPoint, mapAreas])

const MapsDataSource: React.FC<{
  dataSource: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
}> = ({ dataSource, children, voiceAssistant }) => {
  const { defaultStartingPoint, voiceDirectionIsEnabled } = dataSource.general
  const {
    floors: enhancedFloors,
    areas: mapAreas,
  } = useDataSourceForInteractiveMap(dataSource)
  const defaultNav = useDefaultNav(mapAreas, defaultStartingPoint)
  const defaultMapNodesObj = React.useMemo(() => {
    const { floorID } = defaultNav.startpoint.value
    if (floorID) {
      return utils.nodes.createMapNodesObj(enhancedFloors, floorID)
    }
    return {}
  }, [defaultNav.startpoint.value, enhancedFloors])
  const nodesDirections = React.useMemo(() => {
    const nodes = enhancedFloors.reduce(
      (acc, floor) => ({ ...acc, ...floor.nodesDirections }),
      {} as Record<string, MapNodeDirections>
    )
    return new Map(Object.entries(nodes))
  }, [enhancedFloors])
  return (
    <mapNodesStateManager.MapNodesProvider mapNodesObj={defaultMapNodesObj}>
      <mapNodesDirectionsStateManager.MapNodesDirectionsProvider
        nodesDirections={nodesDirections}
      >
        <floors.stateManager.FloorsProvider
          floors={enhancedFloors}
          defaultActiveFloorID={defaultNav.startpoint.value.floorID as string}
        >
          <areas.stateManager.AreasProvider value={mapAreas}>
            <nav.stateManager.NavigationProvider
              floors={enhancedFloors}
              defaultNav={defaultNav}
            >
              <maps.Maps
                voiceDirectionIsEnabled={voiceDirectionIsEnabled}
                voiceAssistant={voiceAssistant}
              >
                {children}
              </maps.Maps>
            </nav.stateManager.NavigationProvider>
          </areas.stateManager.AreasProvider>
        </floors.stateManager.FloorsProvider>
      </mapNodesDirectionsStateManager.MapNodesDirectionsProvider>
    </mapNodesStateManager.MapNodesProvider>
  )
}

// TODO: We can make the voiceAssistant as a Context so that we can avoid props drilling
const InteractiveMaps: React.FC<{
  dataSource?: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
  children: JSX.Element
}> = ({ dataSource, ...otherProps }) =>
  dataSource ? (
    <maps.InteractiveMapsProvider>
      <MapsDataSource dataSource={dataSource} {...otherProps} />
    </maps.InteractiveMapsProvider>
  ) : (
    otherProps.children
  )

export default InteractiveMaps
