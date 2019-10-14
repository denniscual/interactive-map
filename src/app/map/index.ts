import ES65DFT420 from './stores/ES65DFT420'
import * as R from 'ramda'

const parseCategory = R.compose(
  R.join('_'),
  // @ts-ignore
  R.tail,
  R.filter(R.complement(R.isNil)),
  R.match(/^DCIS_(.{3})(.{3})?(.+)?$/)
)

const stores = {
  [ES65DFT420.id]: ES65DFT420,
}

// --------------------------------s--------------------------- //
// ----------------------------------------------------------- //
// Types
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

enum AreaType {
  'STORE' = 'store',
  'PORTAL' = 'portal',
}

interface Area {
  id: string
  label: string
  description?: string
  /**
   * Array of node ids
   */
  type: AreaType
  nodes: string[]
  floorID: string
  /**
   * We gonna add the original category value from dufry. Without parsing it.
   */
  categories: string[]
}

interface Areas {
  [x: string]: Area
}

// Products => indexDB
interface Product {
  id: string | number
  /**
   * NOTE: This property name was reference to dufry provider product data type.
   */
  category: string[]
}

type Products = Product[]

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Data
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

interface ProductsWithAreas {
  [x: string]: {
    id: string
    areas: Area[]
  }
}

interface AreCategoriesEqual {
  (areaCatID: string, productCatID: string): boolean
}

const initEqualityFn: AreCategoriesEqual = (areaCatID, productCatID) =>
  areaCatID === productCatID

/**
 * NOTE: If starting point, we don't need to pass the areaID. But in
 * destination point, we need to pass it.
 *
 * The idea in here is that we need to pass to the interactive maps not only nodes
 * but also we need to pass the areas. So basically we need to pass the areas
 * with the given nodes. Note that product could be associated to different areas because
 * of its categories. Basically categories could be assigned to 1 to many areas
 * Meaning that product can be found to different areas. But then
 * in our interactive map, we only need to find the nearest area from the device.
 *
 * The reason why this function is accepting a equalityFn because
 * the mapping of product to categories logic will vary to callee
 * of the function. The default function is `equalFn`
 *
 * TODO: The areas assigned to a product are sometimes duplicated. We need
 * to filter the areas and remove the duplicated data.
 */
const getProductsWithAreas = <T extends Product>(
  areas: Areas,
  products: T[],
  equalityFn: AreCategoriesEqual = initEqualityFn
) => {
  // We need to filter only the products which has areas. To be able we can filter it,
  // we need to check if the assigned categories of a product has associated area.
  const productsWithAreas: ProductsWithAreas = {}
  products.forEach(prod => {
    // let say prod1 has categories = [cat1, cat2]
    prod.category.forEach(prodCat => {
      /**
       * we need to check if the product category has areas through looping
       * to every area and check if the product category, variable `prodCat`, is
       * is defined to 1 or more areas.
       */
      for (const key in areas) {
        const area = areas[key]

        const foundProductCategory = area.categories.find(areaCat =>
          equalityFn(areaCat, prodCat)
        )

        if (foundProductCategory) {
          // We need to this because product could be assigned in multiple
          // areas. We need to check if the product is already given. If
          // yes, we need to update the areas. Or else, we need to
          // add it to the product collection.
          const currentProduct = productsWithAreas[prod.id]
          if (currentProduct) {
            // update the current areas
            currentProduct.areas.push(area)
          } else {
            // create a new product with areas
            productsWithAreas[prod.id] = {
              id: prod.id as string,
              areas: [area],
            }
          }
        }
      }
    })
  })

  return productsWithAreas
}

const getProductWithAreas = (
  productID: string,
  productsWithAreas: ProductsWithAreas
) => productsWithAreas[productID]

/**
 * TODO: We need also need to add the areas in the Categories. Right now, we are just adding it to products.
 * The behaviour of this function is pretty the same in `getProductsWithAreas` with little bit nuance in the return
 * value.
 */
const getCategorieWithAreas = () => {}

// console.log('Test Suite: getProductsWithAreas')

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
const storeAreas: Areas = {
  ['point-of-sale']: {
    id: 'point-of-sale',
    label: 'Point of Sale',
    type: AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  woc: {
    id: 'woc',
    label: 'WOC',
    type: AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  souvenirs: {
    id: 'souvenirs',
    label: 'Souvenirs',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_0910011', 'DCIS_092'],
    floorID: 'levelOneFloor',
  },
  contentainment: {
    id: 'contentainment',
    label: 'Contentainment',
    type: AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  toys: {
    id: 'toys',
    label: 'Toys',
    type: AreaType.STORE,
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
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_010001', 'DCIS_01000116', 'DCIS_010007'],
    floorID: 'levelOneFloor',
  },
  tobacco: {
    id: 'tobacco',
    label: 'Tobacco',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_010004', 'DCIS_0100042', 'DCIS_010005', ''],
    floorID: 'levelOneFloor',
  },
  ['perfumes-and-cosmetics']: {
    id: 'perfumes-and-cosmetics',
    label: 'Perfumes and Cosmetics Promotion',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_040005'],
    floorID: 'levelOneFloor',
  },
  ['liquor-promotion']: {
    id: 'liquor-promotion',
    label: 'Liquor Promotion',
    type: AreaType.STORE,
    nodes: [],
    categories: [''],
    floorID: 'levelOneFloor',
  },
  liquor: {
    id: 'liquor',
    label: 'Liquor',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_0200052', 'DCIS_020005'],
    floorID: 'levelOneFloor',
  },
  ['alcoholic-beverages-promotion']: {
    id: 'alcoholic-beverages-promotion',
    label: 'Alcoholic Beverages Promotion',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_020009'],
    floorID: 'levelOneFloor',
  },
  ['alcoholic-beverages']: {
    id: 'alcoholic-beverages',
    label: 'Alcoholic Beverages',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_0200091', 'DCIS_0200092', 'DCIS_020009'],
    floorID: 'levelOneFloor',
  },
  ['gift-boxes']: {
    id: 'gift-boxes',
    label: 'Gift Boxes',
    type: AreaType.STORE,
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
  ['madrid-t1-nsh-perfumeria']: {
    id: 'madrid-t1-nsh-perfumeria',
    label: 'Madrid Perfume',
    type: AreaType.STORE,
    nodes: [],
    categories: [],
    floorID: 'levelOneFloor',
  },
  sunglasses: {
    id: 'sunglasses',
    label: 'Sunglasses',
    type: AreaType.STORE,
    nodes: [],
    categories: [
      'DCIS_01000516',
      'DCIS_050006',
      'DCIS_0500061',
      'DCIS_07000516',
    ],
    floorID: 'levelOneFloor',
  },
  ['fashion-and-luxury']: {
    id: 'fashion-and-luxury',
    label: 'Fashion and Luxury',
    type: AreaType.STORE,
    nodes: [],
    categories: ['DCIS_050'],
    floorID: 'levelOneFloor',
  },
}

// const storeProducts: Products = [
//   {
//     id: 'prod1',
//     categories: ['001_001'],
//   },
//   {
//     id: 'prod2',
//     categories: ['010_001_16'],
//   },
//   {
//     id: 'prod3',
//     categories: ['010_001_14'],
//   },
// ]

// const productsWithAreas = getProductsWithAreas(
//   storeAreas,
//   storeProducts,
//   (areaCatID: string, productCatID: string) => {
//     const parsedCat = parseCategory(areaCatID)
//     return productCatID.startsWith(parsedCat)
//   },
// )
// // console.log(productsWithAreas)

const areCategoriesEqual = (areaCatID: string, productCatID: string) => {
  const parsedCat = parseCategory(areaCatID)
  return productCatID.startsWith(parsedCat)
}

const getMapDataSource = (storeID: string) => {
  const store = stores[storeID]
  if (store) {
    return store.dataSource
  }
}

export {
  getMapDataSource,
  getProductsWithAreas,
  areCategoriesEqual,
  getCategorieWithAreas,
  storeAreas,
}
