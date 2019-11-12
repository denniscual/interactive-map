import { Types } from '../../interactive-maps'

// TODO: This should be came from in `api` types. Because we are coupled to that, we need to
// be synced.
export enum SpecialCategories {
  PROMOTIONS = 'PROMOTIONS',
  NOVELTY = 'NOVELTY',
  EXCLUSIVES = 'EXCLUSIVES',
}

/**
 * Properties use to map the product to an areas
 */
interface MappedData {
  mapping?: {
    categories: string[]
    specialCategories?: SpecialCategories[]
    brands?: string[]
    excludedBrands?: string[]
  }
}

// NOTE: Value of the enum should be synced to the Languages uses by
// maps package and also the storea assistant. It means that they must be the same.
// But this is easy maintenance.
// TODO: But I think we can simplify this through our translation will
// be given by the provider and maps package doesn't have now default translation
// for more simpler approach. Because this is little brittle.

// TODO: The source of truth about the languages must be coming in
// dufry provider. We need to follow that languages instead of having isolated
// translations.

export enum Languages {
  EN = 'en', // English-Great Britain
  ES = 'es', // Spanish - Spain (Traditional)
  DE = 'de', // German - Germany
}

interface Labels {
  labels: {
    [Languages.EN]: string
    [Languages.DE]?: string
    [Languages.ES]?: string
  }
}

/**
 * Configuration for every map of a store.
 */
export interface StoreMapConfig {
  id: string
  dataSource: Types.InteractiveMapsDataSource
}

// TODO: This should be came from in `api` types. Because we are coupled to that, we need to
// be synced.
export interface DufryProduct {
  id: string | number
  /**
   * NOTE: This property name was reference to dufry provider product data type.
   */
  category: string[]
  vendor: string
}

export type DufryStoreArea = Types.StoreArea & MappedData & Labels

export interface DufryStoreAreas {
  [x: string]: DufryStoreArea
}

export interface DufryProductsWithAreas {
  [x: string]: {
    id: string | number
    areaID: string
    specialCategory?: string
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
