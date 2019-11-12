import * as basement from './basement'
import * as groundFloor from './ground-floor'
import * as levelOneFloor from './level-one-floor'
import nodeDirections from './general-directions'
import portalAreas from './general-portals'
import mapCSS from '../map-css'
import { groupAreaLabelsByLanguages, mergeTranslations } from '../../utilities'
import langTranslation from './translations'
import { Types } from '../../../../interactive-maps'

const floors = [
  // {
  //   id: 'basementFloor',
  //   label: 'Basement',
  //   nodesDirections: nodeDirections,
  //   nodes: basement.areasAndNodes.nodes as Types.MapNodesProps[],
  //   map: basement.map,
  //   // NOTE: The id value is an areaID.
  //   portals: [
  //     {
  //       id: 'elevator-1',
  //       type: 'twoWay',
  //     } as const,
  //     {
  //       id: 'escalator-1-ground-level',
  //       type: 'oneWay',
  //       directionPoint: 'ENTRY',
  //     } as const,
  //     {
  //       id: 'escalator-basement',
  //       type: 'oneWay',
  //       directionPoint: 'EXIT',
  //     } as const,
  //   ],
  // },
  // {
  //   id: 'groundFloor',
  //   label: 'Ground Floor',
  //   nodesDirections: nodeDirections,
  //   // FIXME: We need to remove this "escape hatch".
  //   nodes: groundFloor.areasAndNodes.nodes as Types.MapNodesProps[],
  //   map: groundFloor.map,
  //   portals: [
  //     {
  //       id: 'elevator-1',
  //       type: 'twoWay',
  //     } as const,
  //     {
  //       id: 'escalator-1-ground-level',
  //       type: 'oneWay',
  //       directionPoint: 'EXIT',
  //     } as const,
  //     {
  //       id: 'escalator-basement',
  //       type: 'oneWay',
  //       directionPoint: 'ENTRY',
  //     } as const,
  //   ],
  // },
  {
    id: 'levelOneFloor',
    label: 'Level One',
    nodesDirections: nodeDirections,
    nodes: levelOneFloor.areasAndNodes.nodes as Types.MapNodesProps[],
    map: levelOneFloor.map,
    portals: [],
  },
]

const storeAreas = {
  // ...basement.areasAndNodes.storeAreas,
  // ...groundFloor.areasAndNodes.storeAreas,
  ...levelOneFloor.areasAndNodes.storeAreas,
  // ...portalAreas,
}

const createDataSource = (
  supportedLanguages: string[]
): Types.InteractiveMapsDataSource => {
  return {
    general: {
      defaultStartingPoint:
        process.env.DEVICE_LOCATION ||
        levelOneFloor.areasAndNodes.storeAreas['device-marker'].id,
      deviceAngle: parseInt(process.env.DEVICE_ANGLE || '180'),
      mapCSS,
      voiceDirectionIsEnabled: false,
      // TODO: Make this property as `optional`.
      isMapEditorVisible: false,
      isNodesVisible: false,
    },
    floors,
    storeAreas,
    translations: mergeTranslations(
      groupAreaLabelsByLanguages(storeAreas, supportedLanguages),
      langTranslation
    ),
  }
}

export default {
  id: 'ES65DFT420',
  createDataSource,
}
