// Credit to this blog - https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

export const lineCommand = (point: number[]) => `L ${point[0]} ${point[1]}`;

// Util for bezierCommand function
const line = (pointA: number[], pointB: number[]) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
}; // function line

// Util for bezierCommand function
const controlPoint = (
  current: number[],
  previous: number[],
  next: number[],
  reverse?: boolean,
) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;
  // The smoothing ratio
  const smoothing = 0.02;
  // Properties of the opposed-line
  const o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
}; // function controlPoint

export const bezierCommand = (point: number[], i: number, points: number[][]) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(points[i - 1], points[i - 2], point);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, points[i - 1], points[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
}; // function bezierCommand

/**
 * Creating svg shape path based on the given points, an array of points, and specified path command.
 */
export const svgShapePath = (points: number[][], command: Function) =>
  // build the d attributes by looping over the points
  points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? // if first point
          `M ${point[0]},${point[1]}`
        : // else
          `${acc} ${command(point, i, a)}`,
    '',
  ); // function svgShapePath
