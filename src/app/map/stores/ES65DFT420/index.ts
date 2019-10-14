import * as basement from './basement'
import * as groundFloor from './ground-floor'
import * as levelOneFloor from './level-one-floor'
import * as levelTwoFloor from './level-two-floor'
import * as maps from './maps'
import nodeDirections from './node-directions'
import mapCSS from '../map-css'
import { StoreMapConfig } from '../../types'

// TODO:
// - Update interactive maps using the new flow.
// - Update the Area controls using the new flow.
// - We need to delete the AreasProvider later.
// - We need to support the making 1 or more active area elements in one navigation.
//   This is basically the same in Target. But we need to know if this is good solution.

const floors = [
  {
    id: 'levelTwoFloor',
    label: 'Level Two',
    nodesDirections: nodeDirections,
    nodes: levelTwoFloor.nodes,
    map: maps.levelTwoFloor.map,
    portals: [],
    // Nodes.
    navigation: {
      startpoint: 'node_0.17108',
      endpoint: 'node_0.925193',
    },
  },
]

// Response stores data
const stores = {
  ...levelTwoFloor.stores,
}

// Response portals data.
const portals = {}

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
    stores,
    portals,
  },
}

export default storeMapConfig
