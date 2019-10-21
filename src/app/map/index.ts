import ES65DFT420 from './stores/ES65DFT420-test'
import * as R from 'ramda'
import {
  Product,
  DufryProductsWithAreas,
  DufryStoreArea,
  DufryStoreAreas,
} from './types'

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

// TODO: If the area declares `brands`, typescript
// should throw an error if we gonna include `excludedBrands`.
// And vice versa.

interface DufryProduct extends Product {
  vendor: string
}

/**
 * Get all products which has areas. How do we do it? We gonna check if the product
 * category is included to a specific area. If it is included, we need to check the brand.
 * If the area doesn't have mapped data, no producs would be mapped to this area.
 */
const getProductsWithAreas = <T extends DufryProduct>(
  areas: Record<string, DufryStoreArea>,
  products: T[]
) => {
  try {
    const newAreas: {
      id: string | number
      areaID: string
    }[] = []

    products.forEach(prod => {
      // Loop to every product.category
      prod.category.forEach(prodCat => {
        Object.values(areas).forEach(area => {
          // We only need to operate the areas which has mapping data
          // like area which has category. If the area doesn't have
          // mapping like Point of sale, no need to operate it. Means
          // that product will now map to these areas.
          if (area.mapping) {
            const {
              categories: areaCategories,
              brands,
              excludedBrands,
            } = area.mapping

            // Check if one of the product.categories is included to area categories.
            const foundCategory = areaCategories.find(areaCat =>
              prodCat.startsWith(parseCategory(areaCat))
            )
            if (foundCategory) {
              // Check the product.vendor/brand
              // For brands. Specific Area
              if (brands) {
                // we need to check if prod.vendor is existing on the brands. Seaching would based on regex to make it case insensitive.
                const foundBrand = brands.find(brand => {
                  const regex = new RegExp(brand, 'i')
                  // Searchinf if the regex satisfies the `prod.vendor` string value.
                  return regex.test(prod.vendor)
                })
                if (foundBrand) {
                  return newAreas.push({ id: prod.id, areaID: area.id })
                }
              }
              // For excluded brands. Generic Area
              else if (excludedBrands) {
                const foundBrand = excludedBrands.find(brand => {
                  const regex = new RegExp(brand, 'i')
                  // Searchinf if the regex satisfies the `prod.vendor` string value.
                  return regex.test(prod.vendor)
                })
                if (!foundBrand) {
                  return newAreas.push({ id: prod.id, areaID: area.id })
                }
              }
              // Generic Area
              else if (!brands && excludedBrands!) {
                return newAreas.push({ id: prod.id, areaID: area.id })
              }
            }
          }
        })
      })
    })

    const productsWithAreas: DufryProductsWithAreas = newAreas.reduce(
      (acc, value) => {
        let currentProd = acc[value.id]
        if (currentProd) {
          acc[value.id] = {
            ...currentProd,
            areas: [...currentProd.areas, areas[value.areaID]],
          }
        } else {
          acc[value.id] = {
            id: value.id,
            areas: [areas[value.areaID]],
          }
        }
        return acc
      },
      {} as DufryProductsWithAreas
    )

    return productsWithAreas
  } catch (e) {
    const err = new Error(e.message)
    err.name = 'Maps Provider Error'
    err.stack = e.stack
    throw err
  }
}

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

const getStoreAreasArr = (storeID: string) =>
  Object.values(stores[storeID].dataSource.storeAreas)

const getStoreAreasByFloorID = (storeID: string, floorID: string) =>
  getStoreAreasArr(storeID).filter(area => area.floorID === floorID)

const getStoreArea = (
  storeID: string,
  id: string,
  areas: DufryStoreAreas | DufryStoreArea[]
) => {
  let storeArea
  if (Array.isArray(areas)) {
    storeArea = areas.find(area => area.id === id)
    if (!storeArea) {
      throw new Error(`Area ID'${id}' was not found in store areas collection.`)
    }
  } else {
    storeArea = stores[storeID].dataSource.storeAreas[id]
    if (!storeArea) {
      throw new Error(`Area ID'${id}' was not found in store areas collection.`)
    }
  }
  return storeArea
}

/**
 * Toggling Map feature in store-assistant.
 */
const toggleMap = (storeID: string) => {
  const envMap = process.env.TOGGLE_MAP || 'false'
  if (envMap === 'true') {
    return getMapDataSource(storeID)
  }
}

export {
  toggleMap,
  getMapDataSource,
  getProductsWithAreas,
  areCategoriesEqual,
  getCategorieWithAreas,
  getStoreAreasArr,
  getStoreArea,
  getStoreAreasByFloorID,
}
