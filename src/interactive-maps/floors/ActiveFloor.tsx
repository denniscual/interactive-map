import React from 'react';
import * as mapNodes from '../map-nodes';
import { nodes } from '../__utils__';
import { useAppSelector, appSetters, appUtils } from '../app-state-manager';
import { EnhancedFloors } from '../types';

const ActiveFloor: React.FC<{
  floors: EnhancedFloors;
  defaultActiveFloorID: string;
}> = ({ floors, defaultActiveFloorID, children }) => {
  const activeFloorID = useAppSelector(appUtils.getActiveFloor);
  const mapNodesDispatch = mapNodes.mapNodesStateManager.useMapNodesDispatch();

  React.useEffect(
    function settingActiveFloor() {
      appSetters.activeFloor.setID(defaultActiveFloorID);
    },
    [defaultActiveFloorID],
  );

  React.useEffect(
    function settingMapNodesByActiveFloorID() {
      if (activeFloorID !== '') {
        const mapNodesObj = nodes.createMapNodesObj(floors, activeFloorID);
        mapNodesDispatch({ type: 'ADD_NODES', payload: mapNodesObj });
      }
    },
    [activeFloorID, floors, mapNodesDispatch],
  );
  return <>{children}</>;
};

export default ActiveFloor;
