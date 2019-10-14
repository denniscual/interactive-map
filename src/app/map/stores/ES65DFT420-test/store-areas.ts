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
    type: Types.AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  woc: {
    id: 'woc',
    label: 'WOC',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  souvenirs: {
    id: 'souvenirs',
    label: 'Souvenirs',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_0910011', 'DCIS_092'],
    floorID: 'levelOneFloor',
  },
  contentainment: {
    id: 'contentainment',
    label: 'Contentainment',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  toys: {
    id: 'toys',
    label: 'Toys',
    type: Types.AreaType.STORE,
    nodes: [],
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
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_010001', 'DCIS_01000116', 'DCIS_010007'],
    floorID: 'levelOneFloor',
  },
  tobacco: {
    id: 'tobacco',
    label: 'Tobacco',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_010004', 'DCIS_0100042', 'DCIS_010005', ''],
    floorID: 'levelOneFloor',
  },
  'perfumes-and-cosmetics': {
    id: 'perfumes-and-cosmetics',
    label: 'Perfumes and Cosmetics Promotion',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_040005'],
    floorID: 'levelOneFloor',
  },
  'liquor-promotion': {
    id: 'liquor-promotion',
    label: 'Liquor Promotion',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: [''],
    floorID: 'levelOneFloor',
  },
  liquor: {
    id: 'liquor',
    label: 'Liquor',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_0200052', 'DCIS_020005'],
    floorID: 'levelOneFloor',
  },
  'alcoholic-beverages-promotion': {
    id: 'alcoholic-beverages-promotion',
    label: 'Alcoholic Beverages Promotion',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_020009'],
    floorID: 'levelOneFloor',
  },
  'alcoholic-beverages': {
    id: 'alcoholic-beverages',
    label: 'Alcoholic Beverages',
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_0200091', 'DCIS_0200092', 'DCIS_020009'],
    floorID: 'levelOneFloor',
  },
  'gift-boxes': {
    id: 'gift-boxes',
    label: 'Gift Boxes',
    type: Types.AreaType.STORE,
    nodes: [],
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
    type: Types.AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  sunglasses: {
    id: 'sunglasses',
    label: 'Sunglasses',
    type: Types.AreaType.STORE,
    nodes: [],
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
    type: Types.AreaType.STORE,
    nodes: [],
    categories: ['DCIS_050'],
    floorID: 'levelOneFloor',
  },
}

export default storeAreas
