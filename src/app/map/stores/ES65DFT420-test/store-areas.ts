import { Types } from '../../../../interactive-maps'
/**
 * TODO: We need to ask how to handle the Categories with Promotion in areas.
 * Because right now, we are creating special category like PROMOTION. So
 * I've been thinking that promotion areas are special. This will affect the
 * categories assign to some promotion areas.
 * TODO: We need to ask the areas without categories to Kamil
 *
 * What we need to do is our interactive maps should not be aware about the Store areas.
 * Yes, it will be awared on the svg but Store areas will not. Interactive maps should
 * expose an api like wayfinder which will accept the areas type of the UpdatedProduct.
 * StoreAreas will hold all the store areas on the store. Merge all the areas with their
 * corresponding floor.
 *
 */

const storeAreas: Types.StoreAreas = {
  'point-of-sale': {
    id: 'point-of-sale',
    label: 'Point of Sale',
    type: 'store',
    nodes: ['node_0.140509'],
    categories: [],
    floorID: 'levelOneFloor',
  },
  woc: {
    id: 'woc',
    label: 'WOC',
    type: 'store',
    nodes: ['node_0.954616'],
    categories: [],
    floorID: 'levelOneFloor',
  },
  souvenirs: {
    id: 'souvenirs',
    label: 'Souvenirs',
    type: 'store',
    nodes: ['node_0.997918'],
    categories: ['DCIS_0910011', 'DCIS_092'],
    floorID: 'levelOneFloor',
  },
  contentainment: {
    id: 'contentainment',
    label: 'Contentainment',
    type: 'store',
    nodes: ['node_0.586891'],
    categories: [],
    floorID: 'levelOneFloor',
  },
  toys: {
    id: 'toys',
    label: 'Toys',
    type: 'store',
    nodes: ['node_0.795777'],
    categories: [
      'DCIS_092002',
      'DCIS_060',
      'DCIS_060003',
      'DCIS_0600031',
      'DCIS_0600032',
    ],
    floorID: 'levelOneFloor',
  },
  cigarettes: {
    id: 'cigarettes',
    label: 'Cigarettes',
    type: 'store',
    nodes: ['node_0.868711'],
    categories: ['DCIS_010001', 'DCIS_01000116', 'DCIS_010007'],
    floorID: 'levelOneFloor',
  },
  tobacco: {
    id: 'tobacco',
    label: 'Tobacco',
    type: 'store',
    nodes: ['node_0.08419'],
    categories: ['DCIS_010004', 'DCIS_0100042', 'DCIS_010005', ''],
    floorID: 'levelOneFloor',
  },
  'perfumes-and-cosmetics-promotion': {
    id: 'perfumes-and-cosmetics-promotion',
    label: 'Perfumes and Cosmetics Promotion',
    type: 'store',
    nodes: ['node_0.541345'],
    categories: ['DCIS_040005'],
    floorID: 'levelOneFloor',
  },
  'liquor-promotion': {
    id: 'liquor-promotion',
    label: 'Liquor Promotion',
    type: 'store',
    nodes: ['node_0.17108'],
    categories: [''],
    floorID: 'levelOneFloor',
  },
  liquor: {
    id: 'liquor',
    label: 'Liquor',
    type: 'store',
    nodes: ['node_0.97985', 'node_0.17108'],
    categories: ['DCIS_0200052', 'DCIS_020005'],
    floorID: 'levelOneFloor',
  },
  'alcoholic-beverages-promotion': {
    id: 'alcoholic-beverages-promotion',
    label: 'Alcoholic Beverages Promotion',
    type: 'store',
    nodes: ['node_0.864615'],
    categories: ['DCIS_020009'],
    floorID: 'levelOneFloor',
  },
  'alcoholic-beverages': {
    id: 'alcoholic-beverages',
    label: 'Alcoholic Beverages',
    type: 'store',
    nodes: ['node_0.932309'],
    categories: ['DCIS_0200091', 'DCIS_0200092', 'DCIS_020009'],
    floorID: 'levelOneFloor',
  },
  'gift-boxes': {
    id: 'gift-boxes',
    label: 'Gift Boxes',
    type: 'store',
    nodes: ['node_0.925193'],
    categories: [
      'DCIS_0500091',
      'DCIS_0700023',
      'DCIS_090005',
      'DCIS_09000517',
      'DCIS_09000517',
      'DCIS_09000518',
      'DCIS_09000519',
      'DCIS_0900059',
    ],
    floorID: 'levelOneFloor',
  },
  // TODO: We need to ask this area because right now its category
  // is not handled by our provider due to its category syntax.
  'madrid-t1-nsh-perfumeria': {
    id: 'madrid-t1-nsh-perfumeria',
    label: 'Madrid Perfume',
    type: 'store',
    nodes: ['node_0.102676'],
    categories: [],
    floorID: 'levelOneFloor',
  },
  sunglasses: {
    id: 'sunglasses',
    label: 'Sunglasses',
    type: 'store',
    nodes: ['node_0.147593'],
    categories: [
      'DCIS_01000516',
      'DCIS_050006',
      'DCIS_0500061',
      'DCIS_07000516',
    ],
    floorID: 'levelOneFloor',
  },
  'fashion-and-luxury': {
    id: 'fashion-and-luxury',
    label: 'Fashion and Luxury',
    type: 'store',
    nodes: ['node_0.091099'],
    categories: ['DCIS_050'],
    floorID: 'levelOneFloor',
  },
}

export default storeAreas
