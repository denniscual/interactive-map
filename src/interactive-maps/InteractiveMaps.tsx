import React, { useMemo } from 'react'
import * as maps from './maps'
import * as floors from './floors'
import * as nav from './navigation'
import { appSetters } from './app-state-manager'
import {
  mapNodesStateManager,
  mapNodesDirectionsStateManager,
} from './map-nodes'
import * as utils from './__utils__'
import { DataSourceProvider } from './contexts'
import { MapNodeDirections } from './map-nodes/types'
import * as types from './types'

/**
 * Creating interactive map based in given floors, stores, and portals.*
 * These data are passed by the CMS in the future.
 */
const useDataSourceForInteractiveMap = (
  dataSource: types.InteractiveMapsDataSource
): {
  floors: types.EnhancedFloors
  floorsObj: types.EnhancedFloorsObj
} => {
  const { general, floors } = dataSource
  const { activeArea } = appSetters

  return useMemo(() => {
    const enhancedFloors: types.EnhancedFloors = floors.map(floor => {
      const areasJSXElements = utils.mapElements.parseToReactElements(
        floor.map,
        activeArea.setID
      )
      return {
        ...floor,
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
        graphAndNodes: utils.createMapGraphAndMapNodes(floor.nodes),
        nodesDirections: utils.createNodesDirections(floor.nodesDirections),
        nodes: floor.nodes,
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
    }
  }, [floors, activeArea.setID, general])
}

const initStoreArea: types.StoreArea = {
  id: '',
  label: '',
  floorID: '',
  nodes: [],
  type: '',
}

const MapsDataSource: React.FC<{
  dataSource: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
}> = ({ dataSource, children, voiceAssistant }) => {
  const {
    storeAreas,
    general: { defaultStartingPoint },
  } = dataSource
  const { floors: enhancedFloors } = useDataSourceForInteractiveMap(dataSource)
  const startingpointArea = storeAreas[defaultStartingPoint]
  if (!startingpointArea) {
    throw utils.createError(
      new Error(
        `Area ID '${defaultStartingPoint}' was not found in store areas collection.`
      )
    )
  }
  if (!startingpointArea.floorID || startingpointArea.floorID === '') {
    throw utils.createError(
      new Error(
        `Area ID '${defaultStartingPoint}' was not a "store" area type. Change the provided value
        to a "store" type.`
      )
    )
  }

  const defaultFloor = enhancedFloors.find(
    floor => floor.id === startingpointArea.floorID
  )
  if (!defaultFloor) {
    throw utils.createError(
      new Error(
        `Floor ID '${
          startingpointArea.floorID
        }' was not found in floor collection.`
      )
    )
  }

  const defaultNav = {
    startpoint: startingpointArea,
    endpoint: initStoreArea,
  }

  const defaultMapNodesObj = React.useMemo(() => {
    if (defaultNav.startpoint.floorID) {
      return utils.nodes.createMapNodesObj(
        enhancedFloors,
        startingpointArea.floorID
      )
    }
    return {}
  }, [defaultNav.startpoint.floorID, enhancedFloors, startingpointArea.floorID])

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
          defaultActiveFloorID={defaultFloor.id}
        >
          <nav.stateManager.NavigationProvider
            floors={enhancedFloors}
            defaultNav={defaultNav}
          >
            <maps.Maps voiceAssistant={voiceAssistant}>{children}</maps.Maps>
          </nav.stateManager.NavigationProvider>
        </floors.stateManager.FloorsProvider>
      </mapNodesDirectionsStateManager.MapNodesDirectionsProvider>
    </mapNodesStateManager.MapNodesProvider>
  )
}

const InteractiveMaps: React.FC<{
  dataSource?: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
  children: JSX.Element
}> = React.memo(({ dataSource, ...otherProps }) =>
  dataSource ? (
    // InteractiveMapsProvider is little confusing name for using consuming maps.
    <maps.InteractiveMapsProvider>
      <DataSourceProvider value={dataSource}>
        <MapsDataSource dataSource={dataSource} {...otherProps} />
      </DataSourceProvider>
    </maps.InteractiveMapsProvider>
  ) : (
    otherProps.children
  )
)

export default InteractiveMaps
