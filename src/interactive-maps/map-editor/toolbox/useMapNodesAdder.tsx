import React from 'react'
import { mapNodesStateManager } from '../../map-nodes'
import { useAppSelector, appUtils } from '../../app-state-manager'
import * as types from '../../types'

/**
 * A map developer tool to write a nodes straight to the map.
 */
const useMapNodesAdder = ({
  svgEl,
  setActiveMapNodeID,
  activeTool,
}: {
  svgEl: React.RefObject<SVGSVGElement>
  activeMapNodeID: string
  setActiveMapNodeID: React.Dispatch<string>
  activeTool: types.ActiveTool
  setMapNodeMessageBox: React.Dispatch<JSX.Element>
}) => {
  const mapNodesDispatch = mapNodesStateManager.useMapNodesDispatch()
  const activeFloorID = useAppSelector(appUtils.getActiveFloor)

  // adding svg map node circle element
  const handleClickSVG: React.MouseEventHandler = React.useCallback(
    e => {
      if (svgEl.current && activeTool.activeTool === 'NODES_ADDER') {
        const { current } = svgEl
        // creating props which we gonna use to create svg circle including coordinates.
        const pt = current.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const circlePoint = pt.matrixTransform(
          (current.getScreenCTM() as DOMMatrix).inverse()
        )
        const id = `node_${parseFloat(Math.random().toFixed(6))}`
        const node: types.MapNodesProps = {
          id,
          fill: 'red',
          r: '15',
          cx: Math.round(circlePoint.x),
          cy: Math.round(circlePoint.y),
          'data-key-id': id,
          'data-label': '',
          'data-direct-nodes': [],
          'data-area-type': '',
          'data-area-id': '',
          'data-floor-id': activeFloorID,
        }
        mapNodesDispatch({ type: 'ADD_NODE', payload: node })
        activeTool.dispatch('PAN_AND_ZOOM')
        setActiveMapNodeID(id)
      }
    },
    [activeFloorID, activeTool, mapNodesDispatch, setActiveMapNodeID, svgEl]
  )

  return {
    addingMapNodes: handleClickSVG,
  }
}

export default useMapNodesAdder
