import ES65DFT420 from './stores/ES65DFT420-test'
import * as R from 'ramda'
import { Types } from '../../interactive-maps'
import { Product } from './types'

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
// Typess
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Data
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

interface ProductsWithAreas {
  [x: string]: {
    id: string
    areas: Types.StoreArea[]
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
  areas: Types.StoreAreas,
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

        if (area.categories) {
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

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Store Areas
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const getStoreAreasArr = () => Object.values(ES65DFT420.dataSource.storeAreas)

const getStoreAreasByFloorID = (floorID: string) =>
  getStoreAreasArr().filter(area => area.floorID === floorID)

const getStoreArea = (
  id: string,
  areas: Types.StoreAreas | Types.StoreArea[] = ES65DFT420.dataSource.storeAreas
) => {
  let storeArea
  if (Array.isArray(areas)) {
    storeArea = areas.find(area => area.id === id)
    if (!storeArea) {
      throw new Error(`Area ID'${id}' was not found in store areas collection.`)
    }
  } else {
    storeArea = ES65DFT420.dataSource.storeAreas[id]
    if (!storeArea) {
      throw new Error(`Area ID'${id}' was not found in store areas collection.`)
    }
  }
  return storeArea
}

const storeAreas = ES65DFT420.dataSource.storeAreas

export {
  getMapDataSource,
  getProductsWithAreas,
  areCategoriesEqual,
  getCategorieWithAreas,
  storeAreas,
  getStoreAreasArr,
  getStoreArea,
  getStoreAreasByFloorID,
}
