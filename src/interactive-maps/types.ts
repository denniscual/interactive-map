import React from 'react'
import { Types } from './map-nodes'

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ChangeTypeOfKeys
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

/**
 * Change the type of Keys of T from NewType
 */
export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType // NewType is the new type
> = {
  // Loop to every key. We gonna check if the key
  // is assignable to Keys. If yes, change the type.
  // Else, retain the type.
  [key in keyof T]: key extends Keys ? NewType : T[key]
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ExcludeKeys
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

/**
 * Constructs a type by excluding the set of properties K from T.
 * This is an opposite type for Pick
 */
export type ExcludeKeys<T extends object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>

/**
 * ChangeTypeOfKeys Sample:
 *
 * Person = { fullname: string, age: number }
 * type NewPerson = ChangeTypeOfKeys<Person, 'fullname', {firstname: string, lastname: string}>
 * newPerson => { fullname: { firstname: string, lastname: string }, age: number }
 */

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Graph and Nodes
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

/**
 * TODO: Rename to `MapNode`
 */
export interface MapNodesProps {
  id: string
  cx: number
  cy: number
  // fill: string
  // r: string
  'data-key-id': string
  // 'data-label': string
  'data-direct-nodes': string[]
  // 'data-area-type': string
  // 'data-area-id': string
  'data-floor-id': string
}

export type MapNodeElement = React.ReactElement<MapNodesProps>
export type MapNodesObj = Record<string, MapNodesProps>
export type MapNodesDispatch = React.Dispatch<MapNodesAction>

// For map nodes reducer actions
// This will add all the existing nodes for a map.
interface AddNodesAction {
  type: 'ADD_NODES'
  payload: Record<string, MapNodesProps>
}

interface AddNodeAction {
  type: 'ADD_NODE'
  payload: MapNodesProps
}

interface UpdateDirectNodesAction {
  type: 'UPDATE_DIRECT_NODES'
  payload: string[]
  meta: {
    id: string
  }
}

interface UpdateNodeAction {
  type: 'UPDATE_NODE'
  payload: Partial<MapNodesProps>
  meta?: {
    oldMapNodeID: string
  }
}
interface DeleteNodeAction {
  type: 'DELETE_NODE'
  payload: string
}

export type MapNodesAction =
  | AddNodesAction
  | AddNodeAction
  | UpdateDirectNodesAction
  | UpdateNodeAction
  | DeleteNodeAction

// MapCircle element coordinates in the svg. X-axis and Y-axis.
export interface Coordinates {
  x: number
  y: number
}
// Shape of the every node. This node is defined through a Mapcircle element in the svg. Think that every
// Mapcircle elements are mapped to create a node.
export type MapNode = {
  id: string
  coordinates: Coordinates
  directNodes: string[]
}

// Shape of the collection of nodes
export type MapNodes = Record<string, MapNode>

// Interface of MapGraph
export type MapGraph = {
  [x: string]: {
    [x: string]: number
  }
}

// Interface of map graph and map nodes.
export interface MapGraphAndMapNodes {
  mapNodes: MapNodes
  mapGraph: MapGraph
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Entities
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export interface Entity {
  id: string
  label: string
  floorID?: string
  areaID?: string
}
export type CollectionOfEntity = Record<string, Entity>

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Navigation
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Areas
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export enum AreaType {
  'STORE' = 'store',
  'PORTAL' = 'portal',
  'DEVICE' = 'device',
}

export interface StoreArea {
  id: string
  labels: {
    [x: string]: string
  }
  description?: string
  /**
   * Array of node ids
   */
  type: AreaType | string
  nodes: string[]
  floorID: string
  /**
   * This property will be used by the client data for product mapping.
   * Maps package doesn't care about the mapping properties. And the mapping
   * logic is provided by the callee.
   * NOTE: Not all store area type has mapping functionality.
   */
  mapping?: {
    [x: string]: string[]
  }
}

export interface StoreAreas {
  [x: string]: StoreArea
}

export type Navigation = {
  startpoint: StoreArea
  endpoint: StoreArea
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Portals
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export type PortalType = 'oneWay' | 'twoWay'
export type PortalDirectionPoint = 'ENTRY' | 'EXIT'

export interface Portal {
  id: string
  type: PortalType
  directionPoint?: PortalDirectionPoint
}

export type Portals = Portal[]

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Floors
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export interface MapCSS {
  map: string
  activeArea: string
}

export interface Floor {
  id: string
  label: string
  graphAndNodes: MapGraphAndMapNodes
  nodesDirections: {
    id: string
    directions: (string | string[])[][]
  }[]
  nodes: MapNodesProps[] // svg nodes or points
  map: string // svg map => wrap into a string
  mapCSS?: MapCSS
  // mapCSS?: string // optional css styles for map
  activeAreaCSS?: string
  portals: Portal[]
}

export type Floors = Floor[]

// FIXME: We need to review the type name for this because the name has collision
// to other type. Default in typescript. Means, there is also a type declared in here where the name is
// the same on this name.
export interface Map {
  Component: React.FC
  props: React.SVGAttributes<SVGElement>
  css: string // optional css styles for map
}

export type FloorTransitionAction =
  | 'INIT'
  | 'START_TRANSITION'
  | 'STOP_TRANSITION'

export interface IncludedArea {
  id: string
  type: string
  floorID: string
  label: string
  childs: string[]
  /**
   * NOTE: This field could be client specific.
   */
  departmentDesc?: string[]
  categories: string[]
}

export type MapComponent = React.FC<{
  route: EnhancedNavigation
  startpointMarker?: JSX.Element
}>

// TODO: Re-use some type from OriginaFloor. We can use extend.
export interface EnhancedFloor {
  id: string
  label: string
  graphAndNodes: MapGraphAndMapNodes // nodes which we are using in graph
  nodesDirections: Record<string, Types.MapNodeDirections>
  Map: MapComponent
  portals: Portal[]
  nodes: MapNodesProps[]
}
export type EnhancedFloors = EnhancedFloor[]
export type EnhancedFloorsObj = Record<string, EnhancedFloor>

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Interactive map modifiers
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

// TODO: Add a property `defaultValue` which has a properties of `activeFloorID` and `activeAreaID`.
// `activeAreaID` should accept either string or string[]

// Interface for Interactive map modifiers. The data is used
// for customising the look and feel of Interactive map
// and other defaults.
export interface Modifiers {
  /**
   * Default startingPoint for navigation. Pass an `areaID` in here.
   */
  defaultStartingPoint: string
  // Angle of the device
  deviceAngle: number
  // show svg nodes/points to a Map
  // TODO: Change the name of this variable into nodesIsVisible
  isNodesVisible: boolean
  // TODO: Change the name of this variable into mapEditorIsVisible
  // show map editor
  isMapEditorVisible: boolean
  // TODO: Change the name of this variable into voiceDirectionIsEnable
  // enable or disable voice direction functionality.
  voiceDirectionIsEnabled: boolean
  mapCSS: MapCSS
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Translations
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export type Translations = {
  [x: string]: {
    [x: string]: any
  }
}
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// InteractiveMaps Datasource
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export interface InteractiveMapsDataSource {
  general: Modifiers
  floors: Omit<Floor, 'graphAndNodes'>[]
  storeAreas: StoreAreas
  translations: Translations
}

export type VoiceAssistantModifier = {
  audioElement: HTMLAudioElement
  onSpeak: (message: Record<string, any>) => void
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// EnhancedNavigation
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

/**
 * TODO: We need to remove this type in favor for Route.
 * Enhanced version of navigation based in navigation data given
 * by nagivation control
 */
export type EnhancedNavigation = {
  startpoint: string
  endpoint: string
  floorID: string
}

export type Route = Readonly<{
  startpoint: string
  endpoint: string
  floorID: string
  routeInvolvesMultipleFloors: boolean
}>

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ShortestPortal
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export type ShortestPortal = Readonly<{
  portal: string
  portalDirection: string
  type: string
  nextFloorID: string
}>

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ActiveArea
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export type ActiveArea = 'RESET' | string | string[]

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Map Editor
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export interface EventListener<Element, Event> {
  (this: Element, e: Event): any
}

export const ToolTypes = {
  PAN_AND_ZOOM: 'PAN_AND_ZOOM',
  GRAB: 'GRAB',
  PAN: 'PAN',
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
  NODES_ADDER: 'NODES_ADDER',
  ADD_NODE_DIRECTION: 'ADD_NODE_DIRECTION',
  ADD_DIRECT_NODES: 'ADD_DIRECT_NODES',
  MOVE_NODE: 'MOVE_NODE',
  MOVE_MESSAGE_BOX: 'MOVE_MESSAGE_BOX',
}

export type ActiveToolTypes = keyof (typeof ToolTypes)

export interface ActiveTool {
  activeTool: ActiveToolTypes
  dispatch: React.Dispatch<ActiveToolTypes>
}

export type FunctionalSetViewBox = (viewBox: DOMRect) => DOMRect

export interface MessageBoxCoordinates {
  x: number
  y: number
}

export interface MessageBoxCoordinatesDispatch {
  (value: MessageBoxCoordinates): void
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Interactive Maps
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

// FIXME: We need to review the type name for this because the name has collision
// to other type. Means, there is also a type declared in here where the name is
// the same on this name.
export interface Map {
  id: string
  Component: React.FC
}

export type InteractiveMaps = Map[]

export type InteractiveMapsDispatch = React.Dispatch<InteractiveMaps>

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Map Config
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export interface MapConfig {
  list: {
    id: string
    title: string
    areaSelection: IncludedArea[]
  }[]
  defaultValues: {
    mapId: string
    areaId: string
  }
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Others e.g for utilities
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export interface Noop {
  (): void
}
