import React from 'react'
import styled from 'styled-components'
import { useAppSelector, appUtils } from '../app-state-manager'
import * as floors from '../floors'
import { NotFoundNodeError, svg } from '../__utils__'
import * as types from '../types'

// TODO:
// - add device marker with animation.
// - fix the overlapping issue. right now the revieler path
//   overlap the store areas. We need to port this revieler path
//   at the back of the store areas or wakable path elements.
// - use the areas nodes from latest updates so that we can
//   avoid the overlapping issue of the route paths when trasitioning out.

const MARKER_COLOR = '#3555FF'

const calculateTravelTimeBasedInDistance = (
  distance: number,
  // Value to hold about the duration of the wayfinder animation.
  estimatedtime: number = 6000
) => distance / estimatedtime // divide the distance by estimated time to get the travel time

const RoutePath = styled.path`
  fill: none;
  stroke-dasharray: 0 40 0 40;
  stroke-linecap: round;
  stroke-width: 25px;
  stroke: ${MARKER_COLOR};
`

const BorderRoutePath = styled(RoutePath)`
  fill: none;
  stroke: #494949;
  stroke-width: 42px;
  stroke-opacity: 0.1;
`

const InnerRoutePath = styled(RoutePath)`
  fill: none;
  stroke: white;
  stroke-width: 38px;
`

// TODO: We need to expose an API to modify the styles of our route path / wayfinder path.
type PathProps = {
  length: number
}
const RevielerPath = styled.path<PathProps>`
  /* This stroke color should be the same in walkable-path fill color to achieve animation */
  /* TODO: Next time don't couple */
  stroke: #ffffff;
  stroke-width: 45px;
  /* stroke-linejoin: round; */
  stroke-dasharray: ${({ length }) => length};
  stroke-dashoffset: ${({ length }) => -length};
  animation: ${({ length }) =>
    // duration of the animation should based in length, the distance, instead of relying in static duration.
    // through here, the duration is consistent in different distances.
    `${calculateTravelTimeBasedInDistance(length)}s linear forwards dash}`};
  animation-direction: reverse;

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`
const dis = (p: types.Coordinates, q: types.Coordinates) => {
  return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y))
}

const getPolylineLength = (polylineEl: React.RefObject<SVGPolylineElement>) => {
  if (polylineEl.current) {
    let totalLength = 0
    const ps = polylineEl.current.points
    const numberOfItems = ps.numberOfItems
    for (var i = 1; i < numberOfItems; i++) {
      totalLength += dis(ps.getItem(i - 1), ps.getItem(i))
    }
    return totalLength
  }
  return 0
}

/**
 * TODO: This Component will accept a style prop like "line" or "bezier"
 */
const WayfinderPath: React.FC<{
  paths: string[]
  mapNodes: types.MapNodes
}> = ({ paths, mapNodes }) => {
  const basePath = paths[0]

  const arrayOfPoints = React.useMemo(
    () =>
      paths.map(path => {
        const currentNode = mapNodes[path]
        if (!currentNode) {
          throw NotFoundNodeError(path)
        }
        const x: unknown = currentNode.coordinates.x
        const y: unknown = currentNode.coordinates.y
        return [parseInt(x as string), parseInt(y as string)]
      }),
    [paths, mapNodes]
  )

  const drawingPath = svg.svgShapePath(arrayOfPoints, svg.bezierCommand)

  // ----- Creating the points for polyline svg element ------- //
  const polylinePoints = React.useMemo(() => {
    let points = ''
    const currentNode = mapNodes[basePath]
    if (!currentNode) {
      throw NotFoundNodeError(basePath)
    }
    const currentNodeCoordinates = currentNode.coordinates
    // get the paths which excluded the base path/node.
    const directPaths = paths.slice(1)
    points = points.concat(
      `${Math.round(currentNodeCoordinates.x)},${Math.round(
        currentNodeCoordinates.y
      )} `
    )
    // creating the route
    directPaths.forEach(path => {
      const directNode = mapNodes[path]
      if (!directNode) {
        throw NotFoundNodeError(path)
      }
      const directNodeCoordinates = directNode.coordinates
      points = points.concat(
        `${Math.round(directNodeCoordinates.x)},${Math.round(
          directNodeCoordinates.y
        )} `
      )
    })
    return points
  }, [basePath, mapNodes, paths])

  // ----- Node element based on the given shape ------- //
  const [polylineLength, setPolylineLength] = React.useState(0)
  const polylineEl = React.useRef<SVGPolylineElement>(null)
  // Get the length of the polyline
  React.useEffect(() => {
    if (polylineEl.current) {
      setPolylineLength(getPolylineLength(polylineEl))
    }
  }, [polylineEl, polylinePoints])

  return (
    <g>
      {/* This polyline element is used as data not UI. It means, no need to display
      this in browser. We are using this polyline to get the length of polyline with
      points prop. Then, assign it to RevielerPath. */}
      <polyline ref={polylineEl} points={polylinePoints} fill="none" />
      {/* Render this RevielerPath if the pathLength is not 0 */}
      {/* Don't ever remove the `id` because we are using it to wayinderObservables */}
      {polylineLength > 0 && (
        <>
          <BorderRoutePath d={drawingPath} />
          <InnerRoutePath d={drawingPath} />
          <RoutePath d={drawingPath} />
          {/* Don't remove the wayfinder id because wayfinder observable is listening
          TODO: In the future, remove the coupling or find better solution. */}
          <RevielerPath
            key={`${polylinePoints}`}
            id="wayfinder"
            d={drawingPath}
            length={polylineLength}
            fill="none"
          />
        </>
      )}
    </g>
  )
} // FC WayfinderPath

/**
 * Finding the shortest way going to the destination given the ActiveMap
 */
const Wayfinder: React.FC<{
  route: types.EnhancedNavigation
}> = ({ route }) => {
  const { floorID, endpoint } = route
  const { mapNodes } = floors.stateManager.useGetFloorByID(
    floorID
  ).graphAndNodes
  const paths = useAppSelector(appUtils.getShortestPaths)
  if (endpoint === '' || paths === null) {
    return null
  }
  // If endpoint is not empty, create a WayfinderPath.
  return <WayfinderPath paths={paths} mapNodes={mapNodes} />
}

export default Wayfinder
