import * as basement from './basement'
import * as groundFloor from './ground-floor'
import * as levelTwoFloor from './level-two-floor'
import * as maps from './maps'
import nodeDirections from './node-directions'
import mapCSS from '../map-css'
import storeAreas from './store-areas'
import { StoreMapConfig } from '../../types'

// TODO: Tidy up

const floors = [
  {
    id: 'basementFloor',
    label: 'Basement',
    nodesDirections: nodeDirections,
    nodes: basement.nodes,
    map: maps.basement.map,
    portals: [],
    // TODO: Remove this.
    navigation: {
      startpoint: storeAreas['mens-plus-sizes'],
      endpoint: {
        id: '',
        floorID: '',
        type: '',
        categories: [],
        nodes: [],
        label: '',
      },
    },
  },
  {
    id: 'groundFloor',
    label: 'Ground Floor',
    nodesDirections: nodeDirections,
    nodes: groundFloor.nodes,
    map: maps.groundFloor.map,
    portals: [],
    // TODO: Remove this.
    navigation: {
      startpoint: storeAreas['womens-casual-bottoms'],
      endpoint: {
        id: '',
        floorID: '',
        type: '',
        categories: [],
        nodes: [],
        label: '',
      },
    },
  },
  {
    id: 'levelOneFloor',
    label: 'Level One',
    nodesDirections: nodeDirections,
    nodes: levelTwoFloor.nodes,
    map: maps.levelTwoFloor.map,
    portals: [],
    // TODO: Remove this.
    navigation: {
      startpoint: storeAreas['point-of-sale'],
      endpoint: {
        id: '',
        floorID: '',
        type: '',
        categories: [],
        nodes: [],
        label: '',
      },
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
    storeAreas,
  },
}

export default storeMapConfig
