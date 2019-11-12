import React from 'react'
import createStateManager from 'easy-react-state'
import * as nav from '../navigation'
import * as types from '../types'

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Store Areas
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
const storeAreasState = {
  initialState: {} as types.StoreAreas,
  setters(state: types.StoreAreas) {
    return {
      setAreas(areas: types.StoreAreas) {
        return {
          ...state,
          ...areas,
        }
      },
      /**
       * This will add if the area is not exist or update the information.
       */
      setArea(area: types.StoreArea) {
        state[area.id] = area
        return state
      },
      removeNode(nodeID: string) {
        for (const key in state) {
          const area = state[key]
          const newNodes = area.nodes.filter(node => node !== nodeID)
          state[area.id] = {
            ...area,
            nodes: newNodes,
          }
        }
        return state
      },
      deleteArea(id: string) {
        delete state[id]
        return state
      },
    }
  },
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ShortestPaths
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export type ShortestPaths = string[] | null

const createShortestPathsSetters = () => ({
  setShortestPaths(paths: ShortestPaths) {
    return paths
  },
})

const shortestPathsState = {
  initialState: null,
  setters: createShortestPathsSetters,
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ActiveArea
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export type ActiveArea = {
  id: types.ActiveArea
  isVisible: boolean
}

const createActiveAreaSetters = (state: ActiveArea) => ({
  setIsVisible(visibility: boolean) {
    state.isVisible = visibility
    return state
  },
  setID(id: types.ActiveArea) {
    if (typeof id === 'string' && id === 'RESET') {
      state.id = ''
      return state
    }
    // Return action if the type of action is a string and not empty or
    // type of action is array.
    if (id !== '') {
      state.id = id
      return state
    }
  },
})

const activeAreaState = {
  initialState: {
    id: '',
    isVisible: false,
  },
  setters: createActiveAreaSetters,
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// WelcomeSpeech
// This state tells that the welcome speech in navigation is already
// finished or not.
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
const createWelcomeSpeechSetters = () => ({
  setStatus(visibility: boolean) {
    return visibility
  },
})

const welcomeSpeechState = {
  initialState: false,
  setters: createWelcomeSpeechSetters,
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// ActiveFloor
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
const createActiveFloorSetters = () => ({
  setID(id: string) {
    return id
  },
})

const activeFloorState = {
  initialState: '',
  setters: createActiveFloorSetters,
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// StateManager
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export type AppState = {
  shortestPaths: ShortestPaths
  activeArea: ActiveArea
  welcomeSpeech: boolean
  activeFloor: string
  storeAreas: types.StoreAreas
}

const configStore = {
  storeAreas: storeAreasState,
  shortestPaths: shortestPathsState,
  activeArea: activeAreaState,
  welcomeSpeech: welcomeSpeechState,
  activeFloor: activeFloorState,
}

const [useAppSelector, appSetters] = createStateManager(configStore, {
  label: 'App',
  logging: false,
})

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Utils
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
const appUtils = {
  getApp(state: AppState) {
    return state
  },
  /**
   * A hook for getting one or more app state by keys.
   */
  useAppGetStateByKeys(keys: (keyof AppState)[]) {
    const app = useAppSelector(this.getApp)
    return React.useMemo(() => {
      return keys
        .map(key => ({
          [key]: app[key],
        }))
        .reduce(
          (acc, value) => ({
            ...acc,
            ...value,
          }),
          {}
        )
    }, [keys, app])
  },
  // ----------- ShortestPaths ------------ //
  getStoreAreas(state: AppState) {
    return state.storeAreas
  },
  // ----------- ShortestPaths ------------ //
  getShortestPaths(state: AppState) {
    return state.shortestPaths
  },
  // ----------- ActiveArea ------------ //
  getActiveArea(state: AppState) {
    return state.activeArea
  },
  getActiveAreaID(state: AppState) {
    return state.activeArea.id
  },
  getActiveAreaIsVisible(state: AppState) {
    return state.activeArea.isVisible
  },
  // ----------- WelcomeSpeech ------------ //
  getWelcomeSpeech(state: AppState) {
    return state.welcomeSpeech
  },
  // ----------- ActiveFloor ------------ //
  getActiveFloor(state: AppState) {
    return state.activeFloor
  },
  useResetActiveFloor() {
    const startpoint = nav.stateManager.useStartpoint()
    return React.useCallback(() => {
      appSetters.activeFloor.setID(startpoint.floorID as string)
    }, [startpoint.floorID])
  },
}

export { useAppSelector, appSetters, appUtils }
