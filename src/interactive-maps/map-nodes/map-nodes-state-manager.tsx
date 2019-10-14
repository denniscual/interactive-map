import React, { createContext, useContext } from 'react';
import * as R from 'ramda';
import * as types from '../types';
import { actionTypeErrorMsg, useCreateDispatch } from '../__utils__';

const mapNodesReducer = (state: types.MapNodesObj, action: types.MapNodesAction) => {
  switch (action.type) {
    case 'ADD_NODES': {
      return action.payload;
    }
    case 'ADD_NODE': {
      return Object.assign({}, state, { [action.payload.id]: action.payload });
    }
    case 'UPDATE_DIRECT_NODES': {
      const { payload, meta } = action;
      const currentMapNode = state[meta.id];
      // we only add a unique direct nodes
      const newDirectNodes = new Set();
      payload.forEach((directNode) => newDirectNodes.add(directNode));

      return Object.assign({}, state, {
        [meta.id]: {
          ...currentMapNode,
          'data-direct-nodes': [...newDirectNodes],
        },
      });
    }
    case 'UPDATE_NODE': {
      // If the user change the node ID, we gonna delete the old map node.
      let currentMapNode = {};
      if (action.meta) {
        currentMapNode = state[action.meta.oldMapNodeID];
        delete state[action.meta.oldMapNodeID];
      }
      currentMapNode = state[(action.payload as types.MapNodesProps).id];
      // add the new map node
      return Object.assign({}, state, {
        [(action.payload as types.MapNodesProps).id]: Object.assign(
          {},
          currentMapNode,
          action.payload,
        ),
      });
    }
    case 'DELETE_NODE': {
      return R.dissoc(action.payload, state) as types.MapNodesObj;
    }
    default: {
      throw new Error(actionTypeErrorMsg);
    }
  }
};

const MapNodesContext = createContext<types.MapNodesObj>({});
const MapNodesDispatchContext = createContext<
  React.Dispatch<types.MapNodesAction> | undefined
>(undefined);
const MapNodesProvider: React.FC<{
  mapNodesObj: Record<string, types.MapNodesProps>;
}> = ({ mapNodesObj, children }) => {
  const [mapNodes, dispatch] = React.useReducer(mapNodesReducer, mapNodesObj);
  return (
    <MapNodesContext.Provider value={mapNodes}>
      <MapNodesDispatchContext.Provider value={dispatch}>
        {children}
      </MapNodesDispatchContext.Provider>
    </MapNodesContext.Provider>
  );
};

const useMapNodes = () => R.values(useContext(MapNodesContext));
const useMapNodesObj = () => useContext(MapNodesContext);
const useMapNodesDispatch = () =>
  useCreateDispatch(MapNodesDispatchContext, 'MapNodesProvider', 'useMapNodesDispatch');

const useGetMapNodesByKey = (key: keyof types.MapNodesProps, value: string) => {
  const mapNodes = useMapNodes();
  return mapNodes.filter((node) => node[key] === value);
};

export {
  MapNodesProvider,
  useMapNodes,
  useMapNodesObj,
  useMapNodesDispatch,
  useGetMapNodesByKey,
};
