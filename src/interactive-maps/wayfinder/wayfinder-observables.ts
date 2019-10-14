import React from 'react';
import { fromEvent } from 'rxjs';

// NOTE: We gonna use this hook if we are sure that the wayfinder element is already
// mounted to the DOM.
const useWayfinderObservables = () =>
  React.useMemo(() => {
    // TODO: In the near future, we gonna change the `document` into the `wayfinder`
    // TODO: We gonna pass the shortestPath data to all observers of the startObservable. // What we gonna is to create a context which handles the shortestPath data and
    // call that context in here and pass it to observers/consumers.
    const startObservable = fromEvent(document, 'animationstart');
    // use this observable if we want to check if the wayfinder is finished.
    const endObservable = fromEvent(document, 'animationend');
    return {
      start: startObservable,
      end: endObservable,
    };
  }, []);

export default useWayfinderObservables;
