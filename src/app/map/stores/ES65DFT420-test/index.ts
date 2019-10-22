import * as basement from './basement'
import * as groundFloor from './ground-floor'
import * as levelOneFloor from './level-one-floor'
import nodeDirections from './general-directions'
import portalAreas from './general-portals'
import mapCSS from '../map-css'
import { StoreMapConfig } from '../../types'
import { Types } from '../../../../interactive-maps'

const floors = [
  {
    id: 'basementFloor',
    label: 'Basement',
    nodesDirections: nodeDirections,
    nodes: basement.areasAndNodes.nodes as Types.MapNodesProps[],
    map: basement.map,
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
    // FIXME: We need to remove this "escape hatch".
    nodes: groundFloor.areasAndNodes.nodes as Types.MapNodesProps[],
    map: groundFloor.map,
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
    nodes: levelOneFloor.areasAndNodes.nodes as Types.MapNodesProps[],
    map: levelOneFloor.map,
    portals: [],
  },
]

const storeMapConfig: StoreMapConfig = {
  id: 'ES65DFT420',
  dataSource: {
    general: {
      defaultStartingPoint: process.env.DEVICE_LOCATION || 'device-marker',
      deviceAngle: parseInt(process.env.DEVICE_ANGLE || '180'),
      voiceDirectionIsEnabled: false,
      mapCSS,
      isMapEditorVisible: true,
      isNodesVisible: false,
    },
    floors,
    // FIXME: It doesn't throw an error if you add an unknown field
    // to an area like adding `name` property.
    storeAreas: {
      ...basement.areasAndNodes.storeAreas,
      ...groundFloor.areasAndNodes.storeAreas,
      ...levelOneFloor.areasAndNodes.storeAreas,
      ...portalAreas,
    },
  },
}

export default storeMapConfig
