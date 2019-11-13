import React, { useMemo } from 'react'
import { omit } from 'ramda'
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
import { DnD } from './map-editor'
import * as translations from './translations'
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
  labels: {},
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

  // Init store areas
  React.useEffect(
    function setStoreAreas() {
      if (!storeAreas) {
        throw utils.createError(new Error(`Store areas is undefined.`))
      }
      appSetters.storeAreas.setAreas(storeAreas)
    },
    [storeAreas]
  )

  return (
    <mapNodesStateManager.MapNodesProvider mapNodesObj={defaultMapNodesObj}>
      <mapNodesDirectionsStateManager.MapNodesDirectionsProvider
        nodesDirections={nodesDirections}
      >
        <DnD.MapDragDropProvider>
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
        </DnD.MapDragDropProvider>
      </mapNodesDirectionsStateManager.MapNodesDirectionsProvider>
    </mapNodesStateManager.MapNodesProvider>
  )
}

const InteractiveMaps: React.FC<{
  dataSource?: types.InteractiveMapsDataSource
  voiceAssistant?: types.VoiceAssistantModifier
  language: string
  children: JSX.Element
}> = ({
  dataSource,
  language = translations.getDefaultLanguage(),
  ...otherProps
}) => {
  return React.useMemo(() => {
    // merge the translations from provider and the map translations
    let newTranslations: types.Translations = {}
    if (dataSource) {
      newTranslations = Object.entries(dataSource.translations)
        .map(([lang, value]) => [
          lang,
          {
            ...(translations.data as Record<string, any>)[lang],
            // translations from callee e.g provider has higher precedence.
            // Means that translations can override the default translations of the maps.
            // And also, whatever languages given by the provider, that the languages will be created.
            ...value,
          },
        ])
        .reduce(
          (acc, [lang, value]) => ({
            ...acc,
            [lang]: value,
          }),
          {}
        )
    }

    // get the store labels on the floors and group it.
    return dataSource ? (
      // translations.data should be coming from another package? I think some. For now, put here
      <translations.TranslationsProvider
        value={{ data: newTranslations, lang: language }}
      >
        {/* InteractiveMapsProvider is little confusing name for using consuming maps. */}
        <maps.InteractiveMapsProvider>
          {/* passing the dataSource with omitted `storeAreas` */}
          <DataSourceProvider
            value={
              omit(['storeAreas'], dataSource) as Omit<
                types.InteractiveMapsDataSource,
                'storeAreas'
              >
            }
          >
            <MapsDataSource dataSource={dataSource} {...otherProps} />
          </DataSourceProvider>
        </maps.InteractiveMapsProvider>
      </translations.TranslationsProvider>
    ) : (
      otherProps.children
    )
    // es
  }, [otherProps, language, dataSource])
}

export default InteractiveMaps
