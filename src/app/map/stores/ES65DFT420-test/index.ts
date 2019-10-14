import * as levelTwoFloor from './level-two-floor'
import * as maps from './maps'
import nodeDirections from './node-directions'
import mapCSS from '../map-css'
import storeAreas from './store-areas'
import { StoreMapConfig } from '../../types'

// TODO:
// - Update interactive maps using the new flow.
// - Update the Area controls using the new flow.
// - We need to delete the AreasProvider later.
// - We need to support the making 1 or more active area elements in one navigation.
//   This is basically the same in Target. But we need to know if this is good solution.

const floors = [
  {
    id: 'levelOneFloor',
    label: 'Level One',
    nodesDirections: nodeDirections,
    nodes: levelTwoFloor.nodes,
    map: maps.levelTwoFloor.map,
    portals: [],
    // Nodes.
    navigation: {
      startpoint: storeAreas['point-of-sale'],
      endpoint: storeAreas['toys'],
    },
  },
]

const storeMapConfig: StoreMapConfig = {
  id: 'ES65DFT420',
  dataSource: {
    general: {
      defaultStartingPoint: process.env.DEVICE_LOCATION || 'node_0.17108',
      deviceAngle: parseInt(process.env.DEVICE_LOCATION || '180'),
      voiceDirectionIsEnabled: false,
      mapCSS,
      isMapEditorVisible: false,
      isNodesVisible: false,
    },
    floors,
  },
}

export default storeMapConfig
