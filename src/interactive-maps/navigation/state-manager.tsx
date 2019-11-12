import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
} from 'react'
import * as types from '../types'

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Navigation
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

type Actions = 'START_POINT' | 'END_POINT' | 'RESET'

type Action = {
  type: Actions
  payload?: types.StoreArea | Partial<types.Navigation>
}

const NavigationContext = createContext({} as types.Navigation)
const StartpointContext = createContext<types.StoreArea>({
  id: '',
  labels: {},
  nodes: [],
  floorID: '',
  mapping: {
    categories: [],
  },
  type: types.AreaType.STORE,
})
const NavigationDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
)

const createInitNav = (
  defaultNav: types.Navigation,
  payload?: Partial<types.Navigation>
) => {
  return {
    ...defaultNav,
    ...payload,
  }
}

const useNavigationReducer: (
  floors: types.EnhancedFloors,
  defaultNav: types.Navigation,
  createInit: (
    state: types.Navigation,
    payload?: types.Navigation
  ) => types.Navigation
) => [types.Navigation, React.Dispatch<Action>] = (
  floors,
  defaultNav,
  createInit
) => {
  // Navigation reducer
  const reducer = (
    state: types.Navigation,
    action: Action
  ): types.Navigation => {
    const { type, payload } = action
    if (payload) {
      switch (type) {
        case 'START_POINT': {
          return {
            ...state,
            startpoint: payload as types.StoreArea,
          }
        }
        case 'END_POINT': {
          return {
            ...state,
            endpoint: payload as types.StoreArea,
          }
        }
        case 'RESET': {
          return createInitNav(defaultNav, payload as Partial<types.Navigation>)
        }
      }
    }
    if (type === 'RESET') {
      return defaultNav
    }
    // If the action doesn't recognize by the reducer, return the current state.
    throw new Error(`Action doesn't recognize by the navigation reducer.`)
  }
  const navigationReducer = useCallback(reducer, [floors, defaultNav])
  return useReducer(navigationReducer, defaultNav, createInit)
}

const NavigationProvider: React.FC<{
  floors: types.EnhancedFloors
  defaultNav: types.Navigation
}> = ({ floors, defaultNav, children }) => {
  const [navigation, dispatch] = useNavigationReducer(
    floors,
    defaultNav,
    createInitNav
  )
  return (
    <NavigationContext.Provider value={navigation}>
      <NavigationDispatchContext.Provider value={dispatch}>
        <StartpointContext.Provider value={defaultNav.startpoint}>
          {children}
        </StartpointContext.Provider>
      </NavigationDispatchContext.Provider>
    </NavigationContext.Provider>
  )
} // Function NavigationProvider

const useNavigation = () => useContext(NavigationContext)
const useNavigationDispatch = () => useContext(NavigationDispatchContext)
const useStartpoint = () => useContext(StartpointContext)

export {
  NavigationProvider,
  NavigationContext,
  NavigationDispatchContext,
  useNavigation,
  useNavigationDispatch,
  useStartpoint,
}
