import React from 'react'
import * as types from '../../types'

// Embedding pan effect into svg
const useMapPanEffect = (
  svgEl: React.RefObject<SVGSVGElement>,
  setViewBox: React.Dispatch<DOMRect | types.FunctionalSetViewBox>,
  activeTool: types.ActiveTool
) => {
  // ------------ Providing Panning Effect -------------- //
  // Reference = https://css-tricks.com/creating-a-panning-effect-for-svg/
  const [isPointerDown, setIsPointerDown] = React.useState(false)
  const pointerOrigin = React.useRef<DOMPoint | null>(null)

  React.useEffect(() => {
    const svgRef = svgEl.current
    if (svgRef) {
      const getPointFromEvent = (e: PointerEvent) => {
        const point = svgRef.createSVGPoint()
        // If even is triggered by a touch event, we get the position of the first finger
        point.x = e.clientX
        point.y = e.clientY
        // We get the current transformation matrix of the SVG and we inverse it
        const invertedSVGMatrix = (svgRef.getScreenCTM() as DOMMatrix).inverse()
        return point.matrixTransform(invertedSVGMatrix) as DOMPoint
      }
      const handlePointerDown: types.EventListener<
        SVGSVGElement,
        PointerEvent
      > = e => {
        setIsPointerDown(true) // We set the pointer as down
        // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
        pointerOrigin.current = getPointFromEvent(e)
      }

      const handlePointerMove: types.EventListener<
        SVGSVGElement,
        PointerEvent
      > = e => {
        // Only run this function if the pointer is down
        if (!isPointerDown) {
          return
        }
        // This prevent user to do a selection on the page
        e.preventDefault()

        // Get the pointer position as an SVG Point
        const pointerPosition = getPointFromEvent(e)

        // Update the viewBox variable with the distance from origin and current position
        // We don't need to take care of a ratio because this is handled in the getPointFromEvent function
        if (pointerOrigin.current && svgEl.current) {
          // const mapViewBox = svgEl.current.viewBox.baseVal
          // mapViewBox.x -= pointerPosition.x - pointerOrigin.current.x
          // mapViewBox.y -= pointerPosition.y - pointerOrigin.current.y
          setViewBox(viewBox => ({
            ...viewBox,
            x:
              viewBox.x -
              (pointerPosition.x -
                (pointerOrigin as React.MutableRefObject<DOMPoint>).current.x),
            y:
              viewBox.y -
              (pointerPosition.y -
                (pointerOrigin as React.MutableRefObject<DOMPoint>).current.y),
          }))
        }
      }

      const handlePointerUp: types.EventListener<
        SVGSVGElement,
        PointerEvent
      > = e => {
        setIsPointerDown(false)
      }

      if (
        activeTool.activeTool === types.ToolTypes.PAN_AND_ZOOM ||
        activeTool.activeTool === types.ToolTypes.ADD_DIRECT_NODES ||
        activeTool.activeTool === types.ToolTypes.ADD_NODE_DIRECTION
      ) {
        svgRef.addEventListener('pointerdown', handlePointerDown)
        svgRef.addEventListener('pointermove', handlePointerMove)
        svgRef.addEventListener('pointerup', handlePointerUp)

        return () => {
          svgRef.removeEventListener('pointerdown', handlePointerDown)
          svgRef.removeEventListener('pointermove', handlePointerMove)
          svgRef.removeEventListener('pointerup', handlePointerUp)
        }
      }
      // Else, remove pan effect
      else {
        svgRef.removeEventListener('pointerdown', handlePointerDown)
        svgRef.removeEventListener('pointermove', handlePointerMove)
        svgRef.removeEventListener('pointerup', handlePointerUp)
      }
    }
  }, [activeTool, isPointerDown, setViewBox, svgEl])
}

export default useMapPanEffect
