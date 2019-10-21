import { Types } from '../../interactive-maps'

/**
 * Properties use to map the product to an areas
 */
type MappedData = {
  mapping: {
    categories: string[]
    brands?: string[]
    excludedBrands?: string[]
  }
}

/**
 * Configuration for every map of a store.
 */
export interface StoreMapConfig {
  id: string
  dataSource: Types.InteractiveMapsDataSource
}

export interface Product {
  id: string | number
  /**
   * NOTE: This property name was reference to dufry provider product data type.
   */
  category: string[]
  vendor: string
}

export type DufryStoreArea = Types.StoreArea & MappedData

export interface DufryStoreAreas {
  [x: string]: DufryStoreArea
}

export interface DufryProductsWithAreas {
  [x: string]: {
    id: string | number
    areas: DufryStoreArea[]
  }
}

/**
 * Client interactive map configuration. We gonna add here all of the stores
 * of the client which has its own store map. It also handle the default
 * config like Map UI for every deployed maps. This idea is based on current
 * implementation of dufry where stores are based on same provider settings.
 */
// export interface InteractiveMap {
//   /**
//    * A collection of the store which determines if the store has map. Every store
//    * map has its own configuration.
//    */
//   stores: Record<string, StoreMapConfig>;
//   /**
//    * Map and active area styles
//    * NOTE: Right now, we make this optional. But in the future, this will hold
//    * the common map styles for the client map UI.
//    */
//   mapCSS?: Types.MapCSS;
// }
