import React from 'react'
import { fromEvent } from 'rxjs'

// NOTE: We gonna use this hook if we are sure that the wayfinder element is already
// mounted to the DOM.
const useWayfinderObservables = () =>
  React.useMemo(() => {
    const startObservable = fromEvent(document, 'animationstart')
    // use this observable if we want to check if the wayfinder is finished.
    const endObservable = fromEvent(document, 'animationend')
    return {
      start: startObservable,
      end: endObservable,
    }
  }, [])

export default useWayfinderObservables
