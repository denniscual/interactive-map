import React from 'react'
import * as stateManager from './state-manager'
import { usePrevious } from '../__utils__'
import { isNil } from 'ramda'
import { Navigation } from '../types'
import { Observable } from 'rxjs'

type NavigationObservableTypes = 'new' | 'sameFloors' | 'differentFloors'
interface NavigationObservable {
  type: NavigationObservableTypes
  navigation: Navigation
}

const useNavigationObservable = () => {
  const navigation = stateManager.useNavigation()
  const startpoint = navigation.startpoint.value
  const endpoint = navigation.endpoint.value

  const prevEndpoint = usePrevious(endpoint.id)

  // 'new' is an event where it triggered when the navigation is new.
  // React.useEffect(() => {
  //   if (
  //     !isNil(prevEndpoint) &&
  //     (startpoint.id !== '' && endpoint.id !== '') &&
  //     prevEndpoint !== endpoint.id
  //   ) {
  //     navigationEmitter.emit('new', navigation, navigationEmitter)
  //   }
  // }, [endpoint.id, navigation, prevEndpoint, startpoint.id])

  // // 'sameFloor' is an event where it triggered when the navigation is occured in the same floor.
  // React.useEffect(() => {
  //   if (startpoint.floorID === endpoint.floorID) {
  //     navigationEmitter.emit('sameFloor', navigation, navigationEmitter)
  //   }
  // }, [endpoint.floorID, navigation, startpoint.floorID])

  // // // 'differentFloors' is an event where it triggered when the navigation is occured
  // // // in diffent floors.
  // React.useEffect(() => {
  //   if (startpoint.floorID !== endpoint.floorID) {
  //     navigationEmitter.emit('differentFloors', navigation, navigationEmitter)
  //   }
  // }, [endpoint.floorID, navigation, startpoint.floorID])

  // // add listener. The returned function is the remove
  // const addListener = React.useCallback(
  //   (event: Events, listener: EventListener): (() => void) => {
  //     navigationEmitter.on(event, listener)
  //     const removeListener = () =>
  //       navigationEmitter.removeListener(event, listener)
  //     return removeListener
  //   },
  //   []
  // )

  // // Adds a one-time listener function for the event named eventName
  // const once = React.useCallback((event: Events, listener: EventListener) => {
  //   navigationEmitter.once(event, listener)
  // }, [])

  // // remove listener
  // const removeListener = React.useCallback(
  //   (event: Events, listener: EventListener) => {
  //     navigationEmitter.removeListener(event, listener)
  //   },
  //   []
  // )

  // first render => previous value = null, new value = 'zion'
  // second render => previous value = 'zion', new value = 'irish'

  // -------- Observable Pattern ---------- //
  // TODO: We gonna include other obserable types like 'sameFloor' and 'differentFloors'
  const observable = React.useMemo(
    () =>
      new Observable<NavigationObservable>(subscriber => {
        try {
          // For new action type
          if (
            !isNil(prevEndpoint) &&
            (startpoint.id !== '' && endpoint.id !== '') &&
            prevEndpoint !== endpoint.id
          ) {
            subscriber.next({ type: 'new', navigation })
          }
        } catch (error) {
          subscriber.error(error)
        }
      }),
    [endpoint.id, navigation, prevEndpoint, startpoint.id]
  )

  return observable
}

export default useNavigationObservable
