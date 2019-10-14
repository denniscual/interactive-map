import { Types } from '../../interactive-maps'

/**
 * Configuration for every map of a store.
 */
export interface StoreMapConfig {
  id: string
  dataSource: Types.InteractiveMapsDataSource
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
