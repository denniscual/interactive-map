import * as basement from './basement'
import * as groundFloor from './ground-floor'
import * as levelTwoFloor from './level-two-floor'
import * as maps from './maps'
import nodeDirections from './node-directions'
import mapCSS from '../map-css'
import storeAreas from './store-areas'
import { StoreMapConfig } from '../../types'

const floors = [
  {
    id: 'basementFloor',
    label: 'Basement',
    nodesDirections: nodeDirections,
    nodes: basement.nodes,
    map: maps.basement.map,
    // NOTE: The id value is an areaID.
    portals: [
      {
        id: 'elevator-1',
        type: 'twoWay',
      } as const,
      {
        id: 'escalator-1-ground-level',
        type: 'oneWay',
        directionPoint: 'ENTRY',
      } as const,
      {
        id: 'escalator-basement',
        type: 'oneWay',
        directionPoint: 'EXIT',
      } as const,
    ],
  },
  {
    id: 'groundFloor',
    label: 'Ground Floor',
    nodesDirections: nodeDirections,
    nodes: groundFloor.nodes,
    map: maps.groundFloor.map,
    portals: [
      {
        id: 'elevator-1',
        type: 'twoWay',
      } as const,
      {
        id: 'escalator-1-ground-level',
        type: 'oneWay',
        directionPoint: 'EXIT',
      } as const,
      {
        id: 'escalator-basement',
        type: 'oneWay',
        directionPoint: 'ENTRY',
      } as const,
    ],
  },
  {
    id: 'levelOneFloor',
    label: 'Level One',
    nodesDirections: nodeDirections,
    nodes: levelTwoFloor.nodes,
    map: maps.levelTwoFloor.map,
    portals: [],
  },
]

const storeMapConfig: StoreMapConfig = {
  id: 'ES65DFT420',
  dataSource: {
    general: {
      defaultStartingPoint: process.env.DEVICE_LOCATION || 'fashion-and-luxury',
      deviceAngle: parseInt(process.env.DEVICE_LOCATION || '180'),
      voiceDirectionIsEnabled: false,
      mapCSS,
      isMapEditorVisible: true,
      isNodesVisible: true,
    },
    floors,
    storeAreas,
  },
}

export default storeMapConfig
