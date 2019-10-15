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
} => {
  const { general, floors: originalFloors } = dataSource
  const { activeArea } = appSetters

  const floors = parseOriginalFloors(originalFloors)

  return useMemo(() => {
    // --------- Define Areas --------- //
    // Transforming areas object into area array
    const defaultNav = (dataSource.floors.find(
      floor => floor.id === 'levelOneFloor'
    ) as types.OriginalFloor).navigation

    // --------- Define Floors --------- //
    const enhancedFloors: types.EnhancedFloors = floors.map(
      (floor, floorIdx) => {
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
          // TODO: Little bit hacky, needs to clean a little bit.
          navigation: originalFloors[floorIdx].navigation,
          nodes: floor.nodes.props.children,
        }
      }
    )
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
  }, [dataSource.floors, floors, activeArea.setID, general, originalFloors])
} // Function createDataForInteractiveMap

const MapsDataSource: React.FC<{
  dataSource: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
}> = ({ dataSource, children, voiceAssistant }) => {
  const { defaultStartingPoint, voiceDirectionIsEnabled } = dataSource.general
  const { floors: enhancedFloors } = useDataSourceForInteractiveMap(dataSource)
  const defaultFloor = enhancedFloors[0].id
  const defaultNav = enhancedFloors[0].navigation
  const defaultMapNodesObj = React.useMemo(() => {
    if (defaultNav.startpoint.floorID) {
      return utils.nodes.createMapNodesObj(
        enhancedFloors,
        defaultNav.startpoint.floorID
      )
    }
    return {}
  }, [enhancedFloors, defaultNav.startpoint.floorID])

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
          defaultActiveFloorID={defaultFloor}
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

// TODO: We can make the voiceAssistant as a Context so that we can avoid props drilling
const InteractiveMaps: React.FC<{
  dataSource?: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
  children: JSX.Element
}> = ({ dataSource, ...otherProps }) =>
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

export default InteractiveMaps
