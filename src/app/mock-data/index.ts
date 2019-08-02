import {
  maps,
  basement,
  groundFloor,
  levelOneFloor,
  nodeDirections,
} from './target'
import { createNodesDirections, createMapGraphAndMapNodes } from './__utils__'

// Response general modifiers data
const general = {
  defaultStartingPoint: 'little-pond_Basement',
  deviceAngle: 90,
  defaultAreaId: '',
  isNodesVisible: false,
  isMapEditorVisible: false,
  voiceDirectionIsEnabled: true,
}

/**
 * Location Name                        Node ID
 * withered-pond_Bourke                 withered-pond_Bourke
 * still-resonance_Ground Floor         still-resonance_Ground
 * silent-lake_Target                   silent-lake_Target
 * restless-shadow_Level-1              restless-shadow_Level-1
 * snowy-wood_Level 1                   snowy-wood_Level-1
 * lively-water_Level 1                 lively-water_Level-1
 * little-pond_Basement                 little-pond_Basement
 */

// Response floors data.
// NOTE: The order of the elements is very important. The first element
// is the bottom floor and the last element is the top floor.
const floors = [
  {
    id: 'basementFloor',
    label: 'Basement',
    // Parsing of react elements into map graph and map nodes should
    // happen in server (CMS).
    graphAndNodes: createMapGraphAndMapNodes(basement.nodes.props.children),
    nodesDirections: createNodesDirections(nodeDirections),
    nodes: basement.nodes,
    map: maps.basement.map,
    mapCSS: maps.basement.mapCSS,
    portals: [
      {
        id: 'node_elevator-1',
        type: 'twoWay',
      } as const,
      {
        id: 'node_escalator-to-ground-level',
        type: 'oneWay',
        directionPoint: 'ENTRY',
      } as const,
      {
        id: 'node_escalator-to-basement',
        type: 'oneWay',
        directionPoint: 'EXIT',
      } as const,
    ],
    navigation: {
      startpoint: 'little-pond_Basement',
      endpoint: '',
    },
  },
  {
    id: 'groundFloor',
    label: 'Ground Level',
    graphAndNodes: createMapGraphAndMapNodes(groundFloor.nodes.props.children),
    nodesDirections: createNodesDirections(groundFloor.directions),
    nodes: groundFloor.nodes,
    map: maps.groundFloor.map,
    mapCSS: maps.groundFloor.mapCSS,
    portals: [
      {
        id: 'node_elevator-1',
        type: 'twoWay',
      } as const,
      {
        id: 'node_elevator-2',
        type: 'twoWay',
      } as const,
      {
        id: 'node_escalator-to-ground-level',
        type: 'oneWay',
        directionPoint: 'EXIT',
      } as const,
      {
        id: 'node_escalator-to-ground-level-2',
        type: 'oneWay',
        directionPoint: 'EXIT',
      } as const,
      {
        id: 'node_escalator-to-basement',
        type: 'oneWay',
        directionPoint: 'ENTRY',
      } as const,
      {
        id: 'node_escalator-to-level-one',
        type: 'oneWay',
        directionPoint: 'ENTRY',
      } as const,
    ],
    navigation: {
      startpoint: 'little-pond_Basement',
      endpoint: '',
    },
  },
  {
    id: 'levelOneFloor',
    label: 'Level One',
    graphAndNodes: createMapGraphAndMapNodes(
      levelOneFloor.nodes.props.children
    ),
    nodesDirections: createNodesDirections(levelOneFloor.directions),
    nodes: levelOneFloor.nodes,
    map: maps.levelOneFloor.map,
    mapCSS: maps.levelOneFloor.mapCSS,
    portals: [
      // {
      //   id: 'node_elevator-1',
      //   type: 'twoWay',
      // } as const,
      {
        id: 'node_elevator-2',
        type: 'twoWay',
      } as const,
      {
        id: 'node_escalator-to-ground-level-2',
        type: 'oneWay',
        directionPoint: 'ENTRY',
      } as const,
      {
        id: 'node_escalator-to-level-one',
        type: 'oneWay',
        directionPoint: 'EXIT',
      } as const,
    ],
    navigation: {
      startpoint: 'little-pond_Basement',
      endpoint: '',
    },
  },
]

// TODO: In our current navigation area / search area, the data is coming from nodes. In near future,
// data should come in parsed svg map. Navigation needs the node id of area, what we gonna do is
// enhanced this areas data then add the associated node for every area. We can do it
// because type area node element has a reference, through its attribute `data-area-id`, to map element.

// Response stores data
const stores = {
  // Basement floor
  ...basement.stores,
  // Ground floor
  ...groundFloor.stores,
  // Level one floor
  ...levelOneFloor.stores,
}

// Response portals data.
const portals = {
  'node_elevator-1': {
    id: 'node_elevator-1',
    label: 'Lift 1',
    areaID: 'elevator-1',
  },
  'node_elevator-2': { id: 'node_elevator-2', label: 'Lift 2', areaID: 'lift' },
  'node_escalator-to-basement': {
    id: 'node_escalator-to-basement',
    label: 'Escalator (to Basement)',
    areaID: 'escalator-basement',
  },
  'node_escalator-to-ground-level': {
    id: 'node_escalator-to-ground-level',
    label: 'Escalator 1 (to Ground Level)',
    areaID: 'escalator-1-ground-level',
  },
  'node_escalator-to-ground-level-2': {
    id: 'node_escalator-to-ground-level-2',
    label: 'Escalator 2 (to Ground level)',
    areaID: 'escalator-2-ground-level',
  },
  'node_escalator-to-level-one': {
    id: 'node_escalator-to-level-one',
    label: 'Escalator (to Level one)',
    areaID: 'escalator-level-one',
  },
}

export default {
  general,
  floors,
  stores,
  portals,
}
