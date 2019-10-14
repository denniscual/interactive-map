import * as basement from './basement'
import * as groundFloor from './ground-floor'
import * as levelOneFloor from './level-one-floor'
import * as levelTwoFloor from './level-two-floor'
import * as maps from './maps'
import nodeDirections from './node-directions'
import mapCSS from '../map-css'
import { StoreMapConfig } from '../../types'

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
  // {
  //   id: 'basementFloor',
  //   label: 'Basement',
  //   // Parsing of react elements into map graph and map nodes should
  //   // happen in server (CMS).
  //   nodesDirections: nodeDirections,
  //   nodes: basement.nodes,
  //   map: maps.basement.map,
  //   portals: [
  //     {
  //       id: 'node_elevator-1',
  //       type: 'twoWay',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-ground-level',
  //       type: 'oneWay',
  //       directionPoint: 'ENTRY',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-basement',
  //       type: 'oneWay',
  //       directionPoint: 'EXIT',
  //     } as const,
  //   ],
  //   navigation: {
  //     startpoint: 'little-pond_Basement',
  //     endpoint: '',
  //   },
  // },
  // {
  //   id: 'groundFloor',
  //   label: 'Ground Level',
  //   nodesDirections: nodeDirections,
  //   nodes: groundFloor.nodes,
  //   map: maps.groundFloor.map,
  //   portals: [
  //     {
  //       id: 'node_elevator-1',
  //       type: 'twoWay',
  //     } as const,
  //     {
  //       id: 'node_elevator-2',
  //       type: 'twoWay',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-ground-level',
  //       type: 'oneWay',
  //       directionPoint: 'EXIT',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-ground-level-2',
  //       type: 'oneWay',
  //       directionPoint: 'EXIT',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-basement',
  //       type: 'oneWay',
  //       directionPoint: 'ENTRY',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-level-one',
  //       type: 'oneWay',
  //       directionPoint: 'ENTRY',
  //     } as const,
  //   ],
  //   navigation: {
  //     startpoint: 'little-pond_Basement',
  //     endpoint: '',
  //   },
  // },
  // {
  //   id: 'levelOneFloor',
  //   label: 'Level One',
  //   nodesDirections: nodeDirections,
  //   nodes: levelOneFloor.nodes,
  //   map: maps.levelOneFloor.map,
  //   portals: [
  //     // {
  //     //   id: 'node_elevator-1',
  //     //   type: 'twoWay',
  //     // } as const,
  //     {
  //       id: 'node_elevator-2',
  //       type: 'twoWay',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-ground-level-2',
  //       type: 'oneWay',
  //       directionPoint: 'ENTRY',
  //     } as const,
  //     {
  //       id: 'node_escalator-to-level-one',
  //       type: 'oneWay',
  //       directionPoint: 'EXIT',
  //     } as const,
  //   ],
  //   navigation: {
  //     startpoint: 'little-pond_Basement',
  //     endpoint: '',
  //   },
  // },
  {
    id: 'levelTwoFloor',
    label: 'Level Two',
    nodesDirections: nodeDirections,
    nodes: levelTwoFloor.nodes,
    map: maps.levelTwoFloor.map,
    portals: [],
    navigation: {
      startpoint: '',
      endpoint: '',
    },
  },
]

// Response stores data
const stores = {
  // Basement floor
  // ...basement.stores,
  // // Ground floor
  // ...groundFloor.stores,
  // // Level one floor
  // ...levelOneFloor.stores,
  ...levelTwoFloor.stores,
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

const storeMapConfig: StoreMapConfig = {
  id: 'ES65DFT420',
  dataSource: {
    general: {
      /**
       * NOTE: These are properties use for the initial starting point nav
       * and the angle of the device marker
       * TODO: This should be coming to device environment.
       */
      defaultStartingPoint: process.env.DEVICE_LOCATION || 'node_0.97985',
      deviceAngle: parseInt(process.env.DEVICE_LOCATION || '180'),
      voiceDirectionIsEnabled: false,
      // TODO: This styles should be inherit in client general map styles config.
      // In the future, we will not add this property here.
      mapCSS,
      // TODO: These properties are used for developing map. In the future we will not expose
      // this into the provider. But right now, we will just leave it so that we
      // can't break the existing behaviour. We just passed this properties
      // for types.
      isMapEditorVisible: false,
      isNodesVisible: false,
    },
    floors,
    stores,
    portals,
  },
}

export default storeMapConfig
