import ES65DFT420 from './stores/ES65DFT420-test'
import * as R from 'ramda'
import {
  DufryProductsWithAreas,
  DufryStoreArea,
  SpecialCategories,
  DufryProduct,
} from './types'

/**
 *  WARNING: `map` config is depending to this. Our mapping feature for product-area use this
 *  utility and that feature for now is tightly coupled to dufry structure.
 *  If you change this, this will break the map mapping feature.
 */
const parseCategory = R.compose(
  R.join('_'),
  // @ts-ignore
  R.tail,
  R.filter(R.complement(R.isNil)),
  R.match(/^DCIS_(.{3})(.{3})?(.+)?$/)
)

const createMapProviderError = (error: Error) => {
  error.name = 'Maps Provider Error'
  return error
}

const stores = {
  [ES65DFT420.id]: ES65DFT420.createDataSource,
}

const isProductIncludedToThisArea = ({
  productBrand = '',
  areaBrands,
  areaExcludedBrands,
}: {
  productBrand: string
  areaBrands?: string[]
  areaExcludedBrands?: string[]
}) => {
  // Check the product.vendor/brand
  // For brands. Specific Area
  if (areaBrands) {
    // we need to check if prod.vendor is existing on the brands. Seaching would based on regex to make it case insensitive.
    const foundBrand = areaBrands.find(brand => {
      const regex = new RegExp(brand, 'i')
      // Searchinf if the regex satisfies the `prod.vendor` string value.
      // dufry prod.vendor is in kebab case. we need to remove the hyphen
      const unKebabCase = productBrand.replace('-', ' ')
      return regex.test(unKebabCase)
    })

    if (foundBrand) {
      return true
    }
  }
  // For excluded brands. Generic Area
  else if (areaExcludedBrands) {
    const foundBrand = areaExcludedBrands.find(brand => {
      const regex = new RegExp(brand, 'i')
      const unKebabCase = productBrand.replace('-', ' ')
      // Searchinf if the regex satisfies the `prod.vendor` string value.
      return regex.test(unKebabCase)
    })
    if (!foundBrand) {
      return true
    }
  } else {
    // Generic Area.
    return true
  }
}

/**
 * Get all products which has areas. How do we do it? We gonna check if the product
 * category is included to a specific area. If it is included, we need to check the brand.
 * If the area doesn't have mapped data, no producs would be mapped, DufryProduct to this area.
 */
const getProductsWithAreas: <T extends DufryProduct>(
  areas: Record<string, DufryStoreArea>,
  products: T[]
) => DufryProductsWithAreas = (areas, products) => {
  try {
    const newAreas: {
      id: string | number
      areaID: string
      specialCategory?: string
    }[] = []

    products.forEach(prod => {
      // Loop to every product.category
      prod.category.forEach(prodCat => {
        Object.values(areas).forEach(area => {
          // We only need to operate the areas which has mapping data
          // like area which has category. If the area doesn't have
          // mapping like Point of sale, no need to operate it. Means
          // that product will not map to these areas.
          if (area.mapping) {
            const {
              categories: areaCategories,
              brands,
              excludedBrands,
              specialCategories,
            } = area.mapping

            /**
             * Dufry store has special kind of areas. So basically there areas
             * which are special areas. Means that these areas handle the promotions
             * products. So instead the customer will go to the specific area, wayfinder
             * will tell custoemr to go to promotion area if that product is associated to that
             * promotion area. We need to handle areas which are special and areas which are
             * not. We only need to put products on the special areas if one its categories
             * is special. Or just put in more generic/specific area without any special
             * type. To be able to handle that, product and area should be special to be able this
             * product could be passed on the this area. Then if they are equal, we need to check if
             * the product has other validation. If the area has assigned brand, this special product
             * should have the same brand for the area. IF the area has assigned excluded brand,
             * the product brand should not the same on of the excluded brands. There are validations
             * happening and `areas` store plays very essential to be able to do this. So basically
             * we need to check if the area and product are special. Or else, run the codes for more
             * generic feature.
             */

            // This codes will run if the area and product are not eqaul special or 1
            // on of the is special.
            if (
              specialCategories ||
              (prodCat.startsWith(SpecialCategories.PROMOTIONS) ||
                prodCat.startsWith(SpecialCategories.NOVELTY) ||
                prodCat.startsWith(SpecialCategories.EXCLUSIVES))
            ) {
              const initSpecialCategories = specialCategories || []
              const specialCategory = prodCat.split('_')[0]

              // check if the `prodCat` is included on the `initSpecialCategories`
              const foundSpecialCategory = initSpecialCategories.find(
                cat => cat === specialCategory
              )

              if (!foundSpecialCategory) {
                //
                // Go to next area
                //
                return
              }

              const foundCategory = areaCategories.find(areaCat => {
                // Note that `prodCat` has special prefix. Like `PROMOTIONS_001_000_1`.
                // And area will be parsed to `001_001_1`. We can't process these 2 categories because
                // they are different. What we gonna do is remove the prefix in `prodCat` and process it.
                const newCat = prodCat
                  .split('_')
                  .slice(1) // remove the prefix
                  .join('_') // create new string which is suit to `areaCat`
                return newCat.startsWith(parseCategory(areaCat))
              })

              if (!foundCategory) {
                return
              }

              if (
                isProductIncludedToThisArea({
                  productBrand: prod.vendor,
                  areaBrands: brands,
                  areaExcludedBrands: excludedBrands,
                })
              ) {
                newAreas.push({
                  id: prod.id,
                  areaID: area.id,
                  specialCategory: foundSpecialCategory,
                })
              }
            }

            // This codes will run if the area and product are not the same special.
            else {
              const foundCategory = areaCategories.find(areaCat => {
                // We need to handle the promotion category
                return prodCat.startsWith(parseCategory(areaCat))
              })

              if (!foundCategory) {
                return
              }

              if (
                isProductIncludedToThisArea({
                  productBrand: prod.vendor,
                  areaBrands: brands,
                  areaExcludedBrands: excludedBrands,
                })
              ) {
                newAreas.push({
                  id: prod.id,
                  areaID: area.id,
                })
              }
            }
          }
        })
      })
    })

    /**
     * We are simplifyinng the logic in here. Basically, product can hold 1 to many areas. But right now
     * we only support 1-to-1 relationship. Because of this, operation below will override the current value of
     * product if it is already defined. This is for products which are assigned to many areas. Note that
     * if the areas assign to a product involves special area/s, these special areas have higher precedence.
     * Means product will always go first to special area then down to more generic/specific area.
     */
    const productsWithAreas: DufryProductsWithAreas = newAreas.reduce(
      (acc, value) => {
        const product = acc[value.id]

        // if product is special, don't override it. Immediately return the state
        if (product && Reflect.has(product, 'specialCategory')) {
          return acc
        }

        return {
          ...acc,
          [value.id]: value,
        }
      },
      {} as DufryProductsWithAreas
    )

    return productsWithAreas
  } catch (e) {
    throw createMapProviderError(new Error(e.message))
  }
}

const getStoreMaps = () => stores

/**
 * I really want to use this function as expressive as possible. Its good
 * to call this through condition. But because we are recalling this function.
 * We will include the condition to its detail.
 */
const getMapDataSource = (
  storeID: string,
  supportedLanguages: string[],
  toggleMap?: string
) => {
  if (toggleMap && toggleMap === 'true') {
    // TODO: `stores` should holding a store map config creators.
    // invoke createStoreMapConfig and pass the languages.
    const createDataSource = stores[storeID]
    if (createDataSource) {
      return createDataSource(supportedLanguages)
    }
  }
}

export { getMapDataSource, getProductsWithAreas, getStoreMaps }
