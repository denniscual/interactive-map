import React, { useMemo } from 'react'
import { values, curry } from 'ramda'
import * as maps from './maps'
import * as floors from './floors'
import * as nav from './navigation'
import * as areas from './areas'
import { appSetters } from './app-state-manager'
import { DnD } from './map-editor'
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

const sortAreasAlphabetically = (areas: types.IncludedArea[]) => {
  return areas.sort((a, b) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })
}

type AreaElement = React.ReactElement<{
  id: string
  children: AreaElement[]
  className?: string
  ['data-label']?: string
  ['data-child']?: string
  ['data-categories']?: string
  ['data-department-desc']?: string
}>

/**
 * TODO: Transform the parameter list into named parameters.
 * Recursively creating areas based in given React element child of type AreaElement
 */
const createAreasByID = (
  child: AreaElement,
  floorID: string,
  includedAreas: types.IncludedArea[] = [],
  areaType: string
) => {
  if (child.props) {
    const { children, id, className } = child.props
    const dataLabel = child.props['data-label']
    const dataChild = child.props['data-child']
    const dataDepartmentDesc = child.props['data-department-desc']
    const dataCategories = child.props['data-categories']

    const departmentDesc: string[] = []
    const areaCategories: string[] = []

    if (dataDepartmentDesc) {
      const deptDesc = dataDepartmentDesc.split(',').map(desc => desc.trim())
      departmentDesc.push(...deptDesc)
    }

    if (dataCategories) {
      areaCategories.push(...dataCategories.split(' '))
    }

    if (className && className.includes('area') && dataLabel) {
      let childs: string[] = []
      if (dataChild) {
        childs = dataChild.split(' ')
      }
      includedAreas.push({
        id,
        type: areaType,
        floorID,
        label: dataLabel,
        childs,
        departmentDesc,
        categories: areaCategories,
      })
      return includedAreas
    }
    if (typeof children !== 'string' && React.Children.count(children) > 0) {
      React.Children.forEach(children, child => {
        return createAreasByID(
          child as AreaElement,
          floorID,
          includedAreas,
          areaType
        )
      })
    }
  }
  return includedAreas
}

const removeLastCharacterString = (str: string) =>
  str.substring(0, str.length - 1)

/**
 * Extracting all areas from the react elements.
 */
const getAreasByFloor = (elements: JSX.Element, floorID: string) => {
  const areasByFloor = React.Children.toArray(elements)
    .map(child => {
      const innerChildren = (child as AreaElement).props.children
      const areas = React.Children.toArray(innerChildren).map(child => {
        if (
          (child as AreaElement).props.id === 'stores' ||
          (child as AreaElement).props.id === 'portals'
        ) {
          return createAreasByID(
            child as AreaElement,
            floorID,
            [],
            removeLastCharacterString((child as AreaElement).props.id) // we need to remove the last character due to the fact that the data use is in singular form where the current is plural form.
          )
        }
        return []
      })
      // map will return a type A[][]
      // we gonna flatten this type into A[]
      return areas.flat()
    })
    // map will return a type A[][]
    // we gonna flatten this type into A[]
    .flat()
  return sortAreasAlphabetically(areasByFloor)
}

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
  const { general, floors, stores, portals } = dataSource
  const { activeArea } = appSetters

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
        areasByFloor: getAreasByFloor(areasJSXElements, floor.id),
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
  }, [
    stores,
    portals,
    floors,
    activeArea.setID,
    general.isNodesVisible,
    general.isMapEditorVisible,
    general.voiceDirectionIsEnabled,
  ])
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
}> = ({ dataSource, children }) => {
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
    const nodes = dataSource.floors.reduce(
      (acc, floor) => ({ ...acc, ...floor.nodesDirections }),
      {} as Record<string, MapNodeDirections>
    )
    return new Map(Object.entries(nodes))
  }, [dataSource.floors])
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
              <DnD.MapDragDropProvider>
                <maps.Maps voiceDirectionIsEnabled={voiceDirectionIsEnabled}>
                  {children}
                </maps.Maps>
              </DnD.MapDragDropProvider>
            </nav.stateManager.NavigationProvider>
          </areas.stateManager.AreasProvider>
        </floors.stateManager.FloorsProvider>
      </mapNodesDirectionsStateManager.MapNodesDirectionsProvider>
    </mapNodesStateManager.MapNodesProvider>
  )
}

const InteractiveMaps: React.FC<{
  dataSource: types.InteractiveMapsDataSource
}> = props => {
  return (
    <maps.InteractiveMapsProvider>
      <MapsDataSource {...props} />
    </maps.InteractiveMapsProvider>
  )
}

export default InteractiveMaps
