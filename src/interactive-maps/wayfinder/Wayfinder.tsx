import React from 'react';
import styled from 'styled-components';
import { useAppSelector, appUtils } from '../app-state-manager';
import * as floors from '../floors';
import { NotFoundNodeError } from '../__utils__';
import * as types from '../types';

const calculateTravelTimeBasedInDistance = (
  distance: number,
  estimatedtime: number = 240,
) => distance / estimatedtime; // divide the distance by estimated time to get the travel time

// TODO: We need to expose an API to modify the styles of our route path / wayfinder path.
type PathProps = {
  length: number;
};
const AnimatedRoutePath = styled.polyline<PathProps>`
  stroke: #ba0000;
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-dasharray: ${({ length }) => length};
  stroke-dashoffset: ${({ length }) => length};
  animation: ${({ length }) =>
    // duration of the animation should based in length, the distance, instead of relying in static duration.
    // through here, the duration is consistent in different distances.
    `${calculateTravelTimeBasedInDistance(length)}s linear forwards dash}`};

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;
function getPolylineLength(polylineEl: React.RefObject<SVGPolylineElement>) {
  function dis(p: types.Coordinates, q: types.Coordinates) {
    return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
  }
  if (polylineEl.current) {
    let totalLength = 0;
    const ps = polylineEl.current.points;
    const numberOfItems = ps.numberOfItems;
    for (var i = 1; i < numberOfItems; i++) {
      totalLength += dis(ps.getItem(i - 1), ps.getItem(i));
    }
    return totalLength;
  }
  return 0;
}

const RoutePath: React.FC<{
  paths: string[];
  mapNodes: types.MapNodes;
}> = ({ paths, mapNodes }) => {
  const basePath = paths[0];
  // ----- Creating the points for polyline svg element ------- //
  const polylinePoints = React.useMemo(() => {
    let points = '';
    const currentNode = mapNodes[basePath];
    if (!currentNode) {
      throw NotFoundNodeError(basePath);
    }
    const currentNodeCoordinates = currentNode.coordinates;
    // get the paths which excluded the base path/node.
    const directPaths = paths.slice(1);
    points = points.concat(
      `${Math.round(currentNodeCoordinates.x)},${Math.round(currentNodeCoordinates.y)} `,
    );
    // creating the route
    directPaths.forEach((path, i) => {
      const directNode = mapNodes[path];
      if (!directNode) {
        throw NotFoundNodeError(path);
      }
      const directNodeCoordinates = directNode.coordinates;
      points = points.concat(
        `${Math.round(directNodeCoordinates.x)},${Math.round(directNodeCoordinates.y)} `,
      );
    });
    return points;
  }, [basePath, mapNodes, paths]);

  // ----- Node element based on the given shape ------- //
  const [polylineLength, setPolylineLength] = React.useState(0);
  const polylineEl = React.useRef<SVGPolylineElement>(null);
  // Get the length of the polyline
  React.useEffect(() => {
    if (polylineEl.current) {
      setPolylineLength(getPolylineLength(polylineEl));
    }
  }, [polylineEl, polylinePoints]);

  return (
    <g id="wayfinder">
      {/* This polyline element is used as data not UI. It means, no need to display
      this in browser. We are using this polyline to get the length of polyline with
      points prop. Then, assign it to AnimatedRoutePath. */}
      <polyline ref={polylineEl} points={polylinePoints} fill="none" />
      {/* Render this AnimatedRoutePath if the pathLength is not 0 */}
      {polylineLength > 0 && (
        <AnimatedRoutePath
          key={`${polylinePoints}`}
          points={polylinePoints}
          length={polylineLength}
          fill="none"
        />
      )}
    </g>
  );
}; // FC RoutePath

/**
 * Finding the shortest way going to the destination given the ActiveMap
 */
const Wayfinder: React.FC<{
  route: types.EnhancedNavigation;
}> = ({ route }) => {
  const { floorID, endpoint } = route;
  const { mapNodes } = floors.stateManager.useGetFloorByID(floorID).graphAndNodes;
  const paths = useAppSelector(appUtils.getShortestPaths);
  if (endpoint === '' || paths === null) {
    return null;
  }
  // If endpoint is not empty, create a RoutePath.
  return <RoutePath paths={paths} mapNodes={mapNodes} />;
};

export default Wayfinder;
