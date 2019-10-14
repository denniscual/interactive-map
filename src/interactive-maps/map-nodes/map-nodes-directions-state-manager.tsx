import React from 'react';
import { MapNodes, MapNodeDirections, DirectionType } from './types';
import { actionTypeErrorMsg } from '../constants';

/**
 * Get the array from arrays, Iterable type, which the values are equal into arr values.
 */
const getArrayWithSameValues: <T>(
  arrays: IterableIterator<T[]>,
  arr: T[],
) => T[] | undefined = (arrays, arr) => {
  let existingArray;
  for (const array of arrays) {
    const allElementsAreIncludedInArr = array.every(
      (element, idx) => element === arr[idx],
    );
    if (allElementsAreIncludedInArr) {
      existingArray = array;
      break;
    }
  }
  return existingArray;
};

interface AddMapNode {
  type: 'ADD_MAP_NODE';
  payload: {
    key: string; // TODO: Change this into MapNodesProps
    value: MapNodeDirections;
  };
}

interface DeleteMapNode {
  type: 'DELETE_MAP_NODE';
  meta: {
    key: string;
  };
}

// update the directions set to every map node
interface UpdateDirection {
  type: 'UPDATE_DIRECTION';
  payload: {
    directionValue: DirectionType;
  };
  meta: {
    key: string; // map node key
    directionKey: string[]; // direction key
  };
}

interface DeleteDirection {
  type: 'DELETE_DIRECTION';
  meta: {
    key: string; // map node key
    directionKey: string[]; // direction key
  };
}

type Actions = AddMapNode | DeleteMapNode | UpdateDirection | DeleteDirection;
type State = MapNodes;

const mapNodeDirectionsReducer = (state: MapNodeDirections, action: Actions) => {
  const { type } = action;
  switch (type) {
    // The UPDATE_DIRECTION has 2 behaviours. One is to add a direction. And the other is to update the direction value.
    case 'UPDATE_DIRECTION': {
      const { payload, meta } = action as UpdateDirection;
      // The behaviour would depend on the reference object assigned to
      // meta.directionKey.

      // This existingNodeDirections array is included in 2d-array returned  keys().
      const existingNodeDirection = getArrayWithSameValues(
        state.keys(),
        meta.directionKey,
      );

      // If the directionKey, the array object, is already added into state, instance of Map class,
      // then we only need to update the assigned direction's value.
      if (existingNodeDirection) {
        return new Map(state).set(
          existingNodeDirection, // we gonna pass the existingNodeDirection
          payload.directionValue,
        );
      }
      // If the directionKey is not yet added. Meaning that it is new in the collection,
      // then add it to the Map. Use the directionKey
      return new Map(state).set(meta.directionKey, payload.directionValue);
    }
    case 'DELETE_DIRECTION': {
      const { meta } = action as DeleteDirection;
      const directionIsDeleted = state.delete(meta.directionKey);
      if (directionIsDeleted) {
        return new Map(state);
      }
      return state;
    }
    default: {
      throw new Error(actionTypeErrorMsg);
    }
  }
};

// Map1 => [node1, node2]: 'LEFT'
// If we gonna try to update this,

// TODO: Right now, we gonna use Map. But in the future, we gonna use WeakMap because this
// collection is just an extension of map nodes. What we want is, when a map node is deleted,
// that map node on this collection should also be garbage-collected. But because Map
// is stronly referenced, it will not garbage-collected. Unlike WeakMap which is weakly
// referenced. Through this, we can optimise our app through freeing some resources in memory.
const mapNodesReducer = (state: State, action: Actions) => {
  const { type } = action;
  switch (type) {
    case 'ADD_MAP_NODE': {
      const { payload } = action as AddMapNode;
      return new Map(state.set(payload.key, payload.value));
    }
    case 'UPDATE_DIRECTION':
    case 'DELETE_DIRECTION': {
      const { meta } = action as { meta: { key: string } };
      // get the map node
      const mapNode = state.get(meta.key);
      if (mapNode) {
        const updatedMapNodeDirections = mapNodeDirectionsReducer(mapNode, action);
        return new Map(state.set(meta.key, updatedMapNodeDirections));
      }
      // If no node is updated, just return the current state because theres no changes
      // happen.
      return state;
    }
    case 'DELETE_MAP_NODE': {
      const { meta } = action as DeleteMapNode;
      const mapNodeIsDeleted = state.delete(meta.key);
      if (mapNodeIsDeleted) {
        return new Map(state);
      }
      // If no node is deleted, just return the current state because theres no changes
      // happen.
      return state;
    }
    default: {
      throw new Error(actionTypeErrorMsg);
    }
  }
};

const MapNodesDirectionsContext = React.createContext<MapNodes>(new Map());
const MapNodesDirectionsDispatchContext = React.createContext<React.Dispatch<Actions>>(
  () => {},
);

const MapNodesDirectionsProvider: React.FC<{
  nodesDirections: Map<string, MapNodeDirections>;
}> = ({ nodesDirections, children }) => {
  const [mapNodesDirections, dispatch] = React.useReducer(
    mapNodesReducer,
    nodesDirections,
  );

  return (
    <MapNodesDirectionsContext.Provider value={mapNodesDirections}>
      <MapNodesDirectionsDispatchContext.Provider value={dispatch}>
        {children}
      </MapNodesDirectionsDispatchContext.Provider>
    </MapNodesDirectionsContext.Provider>
  );
};

const useMapNodesDirections = () => React.useContext(MapNodesDirectionsContext);
const useMapNodesDirectionsDispatch = () =>
  React.useContext(MapNodesDirectionsDispatchContext);
const useMapNodesDirectionsArray = () => {
  const nodesDirections = React.useContext(MapNodesDirectionsContext);
  const directionsArr = Array.from(nodesDirections).map((node) => {
    const directions = node[1];
    return { id: node[0], directions: [...directions] };
  });
  return directionsArr;
};

export {
  MapNodesDirectionsProvider,
  useMapNodesDirections,
  useMapNodesDirectionsDispatch,
  useMapNodesDirectionsArray,
};
