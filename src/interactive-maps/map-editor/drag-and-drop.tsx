import React from 'react'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { css } from 'emotion'
import { dissoc } from 'ramda'
import { mapNodesDirectionsStateManager } from '../map-nodes'
import * as DnD from 'react-dnd'
import * as messageBoxCoordinates from './message-box-coordinates'
import { appSetters } from '../app-state-manager'
import * as types from '../types'

const ItemTypes = {
  MAP_NODE: 'MAP_NODE',
}

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Drag Source Map Node
// ----------------------------------------------------------- //
// ----------------------------------------------------------- /

type DNDMapNodeProps = types.MapNodesProps & {
  connectDragSource: DnD.DragElementWrapper<DnD.DragSourceOptions>
  isDragging: boolean
  className?: string
  activeTool: types.ActiveToolTypes
  isHighlighted: boolean
  onClick: React.MouseEventHandler
  onMouseLeave: React.MouseEventHandler
  onMouseEnter: React.MouseEventHandler
}

const dragSourceSpec: DnD.DragSourceSpec<DNDMapNodeProps, {}> = {
  beginDrag(props, monitor) {
    // Return the data describing the dragged item
    return props
  },
  endDrag(props, monitor) {
    // console.log('Droppable item details ', monitor.getDropResult())
  },
  canDrag(props) {
    return props.activeTool === 'MOVE_NODE'
  },
}
const dragSourceCollect: DnD.DragSourceCollector<{}, types.MapNodesProps> = (
  connect,
  monitor
) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging(),
})

const DNDMapNode: React.FC<DNDMapNodeProps> = ({
  connectDragSource,
  id,
  cx,
  cy,
  className,
  onClick,
  onMouseLeave,
  onMouseEnter,
  isDragging,
  activeTool,
  isHighlighted,
  ...otherProps
}) => {
  return connectDragSource(
    <circle
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
      id={id}
      r={15}
      fill="red"
      cx={cx}
      cy={cy}
      {...otherProps}
    />
  )
}

const DraggableMapNode = DnD.DragSource(
  ItemTypes.MAP_NODE,
  dragSourceSpec,
  dragSourceCollect
)(DNDMapNode)

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Drag Source Message Box
// ----------------------------------------------------------- //
// ----------------------------------------------------------- /

type MessageBoxProps = {
  connectDragSource: DnD.DragElementWrapper<DnD.DragSourceOptions>
  isDragging: true
  id: string
  activeTool: types.ActiveTool
  setMapNodeMessageBox: React.Dispatch<JSX.Element>
  mapNodesDispatch: types.MapNodesDispatch
  coordinates: types.MessageBoxCoordinates
}

const dragSourceMessageBoxSpec: DnD.DragSourceSpec<MessageBoxProps, {}> = {
  beginDrag(props, monitor) {
    // Return the data describing the dragged item
    return props
  },
  endDrag(props, monitor) {
    props.activeTool.dispatch('PAN_AND_ZOOM')
  },
}
const dragSourceMessageBoxCollect: DnD.DragSourceCollector<
  {},
  MessageBoxProps
> = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging(),
})

const messageBoxCSS = css`
  width: 250px;
  height: 150px;
  stroke: #b2b2b2;
  stroke-width: 2px;
  fill: #ffffff;
`

const textCSS = css`
  font-size: 1.7em;
`

const buttonGroupCSS = css`
  &:hover {
    cursor: pointer;
  }
`

const buttonCSS = css`
  width: 109px;
  height: 52px;
  stroke-width: 2px;
`

type MapNodeDirectionsMessageBoxProps = types.ExcludeKeys<
  MessageBoxProps,
  'id'
> & {
  node: types.MapNodesProps
  directions: string[]
}

const MapNodeDirectionsMessageBox: React.FC<
  MapNodeDirectionsMessageBoxProps
> = ({
  connectDragSource,
  activeTool,
  coordinates: { x, y },
  node,
  directions,
}) => {
  const nodeDirections = mapNodesDirectionsStateManager.useMapNodesDirections()
  const nodeDirectionsDispatch = mapNodesDirectionsStateManager.useMapNodesDirectionsDispatch()
  // for container rect
  const messageBoxX = x - 126
  const messageBoxY = y - 171
  // for text
  const textX = x - 106
  const textY = y - 113
  // for button
  const buttonX = x - 58
  const buttonY = y - 98
  // for button text
  const buttonTextX = x - 23
  const buttonTextY = y - 62

  const messageBox = React.useMemo(() => {
    const keyID = node['data-key-id']
    const addNodeDirection = (direction: 'left' | 'right') => {
      const chosenNode = nodeDirections.get(keyID)
      // We need to check if the node is already included in mapNodesDirections collection. If yes, just update the
      // assigned value or add a new direction. Else, add it.
      if (chosenNode) {
        nodeDirectionsDispatch({
          type: 'UPDATE_DIRECTION',
          payload: {
            directionValue: direction,
          },
          meta: {
            key: keyID,
            directionKey: directions,
          },
        })
      } else {
        nodeDirectionsDispatch({
          type: 'ADD_MAP_NODE',
          payload: { key: keyID, value: new Map([[directions, direction]]) },
        })
      }
      // This will hide the message box and set the activeTool.
      activeTool.dispatch('PAN_AND_ZOOM')
    }
    const handleLeftButton = () => addNodeDirection('left')
    const handleRightButton = () => addNodeDirection('right')

    return (
      <>
        <rect
          className={messageBoxCSS}
          x={messageBoxX}
          y={messageBoxY}
          rx="5"
          ry="5"
        />
        <g className={buttonGroupCSS}>
          <text className={textCSS} x={textX + 25} y={textY - 10}>
            Add direction
          </text>
          <g onClick={handleLeftButton}>
            <rect
              className={buttonCSS}
              fill="#282828"
              x={buttonX - 59}
              y={buttonY}
              rx="5"
              ry="5"
            />
            <text
              className={textCSS}
              fill="#ffffff"
              x={buttonTextX - 74}
              y={buttonTextY}
            >
              Left
            </text>
          </g>
          <g onClick={handleRightButton}>
            <rect
              className={buttonCSS}
              onClick={handleRightButton}
              fill="#282828"
              x={buttonX + 60}
              y={buttonY}
              rx="5"
              ry="5"
            />
            <text
              className={textCSS}
              fill="#ffffff"
              x={buttonTextX + 50}
              y={buttonTextY}
            >
              Right
            </text>
          </g>
        </g>
      </>
    )
  }, [
    activeTool,
    buttonTextX,
    buttonTextY,
    buttonX,
    buttonY,
    directions,
    messageBoxX,
    messageBoxY,
    node,
    nodeDirections,
    nodeDirectionsDispatch,
    textX,
    textY,
  ])

  const handleMessageBoxMouseEnter: React.MouseEventHandler = e => {
    activeTool.dispatch('MOVE_MESSAGE_BOX')
  }

  return connectDragSource(
    <g id="map-node-messagebox" onMouseEnter={handleMessageBoxMouseEnter}>
      {messageBox}
    </g>
  )
}

const DraggableMapNodeDirectionsMessageBox = messageBoxCoordinates.withMessageBoxCoordinates(
  DnD.DragSource(
    ItemTypes.MAP_NODE,
    dragSourceMessageBoxSpec,
    dragSourceMessageBoxCollect
  )(MapNodeDirectionsMessageBox)
)

// TODO: We need to move this component into its separate module.
// TODO: Our drag-and-drop module will not couple to any Components.
const MapNodeMessageBox: React.FC<MessageBoxProps> = ({
  connectDragSource,
  id,
  activeTool,
  setMapNodeMessageBox,
  mapNodesDispatch,
  coordinates: { x, y },
}) => {
  // for container rect
  const messageBoxX = x - 126
  const messageBoxY = y - 171
  // for text
  const textX = x - 106
  const textY = y - 113
  // for button
  const buttonX = x - 58
  const buttonY = y - 98
  // for button text
  const buttonTextX = x - 23
  const buttonTextY = y - 62

  const messageBox = React.useMemo(() => {
    const handleMapNodeDeleteButton: React.MouseEventHandler = e => {
      mapNodesDispatch({ type: 'DELETE_NODE', payload: id })
      activeTool.dispatch('PAN_AND_ZOOM')
      setMapNodeMessageBox(<g />)
      // update areas. remove the deleted nodes.
      appSetters.storeAreas.removeNode(id)
    }

    const handleMapNodeAddDirectionButton: React.MouseEventHandler = e => {
      activeTool.dispatch('ADD_NODE_DIRECTION')
      // clear message box
      setMapNodeMessageBox(<g />)
    }

    const handleMapNodeAddDirectNodesButton: React.MouseEventHandler = e => {
      activeTool.dispatch('ADD_DIRECT_NODES')
      // clear message box
      setMapNodeMessageBox(<g />)
    }

    return (
      <>
        <rect
          className={messageBoxCSS}
          x={messageBoxX}
          y={messageBoxY}
          rx="5"
          ry="5"
        />
        <g className={buttonGroupCSS} onClick={handleMapNodeDeleteButton}>
          <rect
            className={buttonCSS}
            fill="red"
            x={messageBoxX}
            y={messageBoxY}
            rx="5"
            ry="5"
          />
          <text
            className={textCSS}
            fill="#ffffff"
            x={messageBoxX}
            y={messageBoxY + 31}
          >
            Delete
          </text>
        </g>
        <g className={buttonGroupCSS} onClick={handleMapNodeAddDirectionButton}>
          <rect
            className={buttonCSS}
            fill="blue"
            x={messageBoxX + 140}
            y={messageBoxY}
            rx="5"
            ry="5"
          />
          <text
            className={textCSS}
            fill="#ffffff"
            x={messageBoxX + 140}
            y={messageBoxY + 31}
          >
            Direction
          </text>
        </g>
        <g className={buttonGroupCSS}>
          <text className={textCSS} x={textX} y={textY}>
            Add direct nodes?
          </text>
          <rect
            onClick={handleMapNodeAddDirectNodesButton}
            className={buttonCSS}
            fill="#282828"
            x={buttonX}
            y={buttonY}
            rx="5"
            ry="5"
          />
          <text
            className={textCSS}
            fill="#ffffff"
            x={buttonTextX}
            y={buttonTextY}
          >
            Ok
          </text>
        </g>
      </>
    )
  }, [
    activeTool,
    buttonTextX,
    buttonTextY,
    buttonX,
    buttonY,
    id,
    mapNodesDispatch,
    messageBoxX,
    messageBoxY,
    setMapNodeMessageBox,
    textX,
    textY,
  ])

  const handleMessageBoxMouseEnter: React.MouseEventHandler = e => {
    activeTool.dispatch('MOVE_MESSAGE_BOX')
  }

  return connectDragSource(
    <g id="map-node-messagebox" onMouseEnter={handleMessageBoxMouseEnter}>
      {messageBox}
    </g>
  )
}

const DraggableMessageBox = messageBoxCoordinates.withMessageBoxCoordinates(
  DnD.DragSource(
    ItemTypes.MAP_NODE,
    dragSourceMessageBoxSpec,
    dragSourceMessageBoxCollect
  )(MapNodeMessageBox)
)

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Drop Target
// ----------------------------------------------------------- //
// ----------------------------------------------------------- /

type MapProps = {
  connectDropTarget: DnD.DragElementWrapper<any>
  isOver: boolean
  isOverCurrent: boolean
  canDrop: boolean
  itemType: string
}

const dropTargetSpec: DnD.DropTargetSpec<
  {
    mapNodeDispatch: React.Dispatch<types.MapNodesAction>
    messageBoxCoordinatesDispatch: types.MessageBoxCoordinatesDispatch
    activeTool: types.ActiveToolTypes
  } & types.MapNodesProps
> = {
  hover(
    { mapNodeDispatch, messageBoxCoordinatesDispatch, activeTool },
    monitor
  ) {
    if (activeTool === 'MOVE_MESSAGE_BOX') {
      const coordinates = monitor.getItem()
        .coordinates as types.MessageBoxCoordinates
      const delta = monitor.getDifferenceFromInitialOffset() as DnD.XYCoord
      const x = Math.round(coordinates.x + delta.x)
      const y = Math.round(coordinates.y + delta.y)

      // updating the coordinates of the message box
      messageBoxCoordinatesDispatch({
        x,
        y,
      })
    } else {
      // You can access the coordinates if you need them
      const item = monitor.getItem() as types.MapNodesProps
      const delta = monitor.getDifferenceFromInitialOffset() as DnD.XYCoord
      const cx = item.cx + (delta ? delta.x : item.cx)
      const cy = item.cy + (delta ? delta.y : item.cy)

      // Don't include direct nodes in updating the node.
      const removedDirectNodes = dissoc(
        'data-direct-nodes',
        item
      ) as types.MapNodesProps

      // updating the coordinates off the node
      mapNodeDispatch({
        type: 'UPDATE_NODE',
        payload: {
          ...removedDirectNodes,
          cx,
          cy,
        },
      })
    }
  },
  drop(props, monitor, component) {
    // If the drop is already handled by a nested drop target.
    if (monitor.didDrop()) {
      return
    }
    // Else, if the drop is not yet handle.
    // Obtain the dragged item
    const item = monitor.getItem()
    return { item }
  },
}
const dropTargetCollect: DnD.DropTargetCollector<{}, types.MapNodesProps> = (
  connect,
  monitor
) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
})

const DNDMap: React.FC<MapProps> = ({ connectDropTarget, children }) => {
  return connectDropTarget(<div>{children}</div>)
}

const DroppableMap = DnD.DropTarget(
  ItemTypes.MAP_NODE,
  dropTargetSpec,
  dropTargetCollect
)(DNDMap)

const MapDragDropProvider: React.FC = ({ children }) => (
  <DnD.DragDropContextProvider backend={MouseBackEnd}>
    {children}
  </DnD.DragDropContextProvider>
)

export {
  MapDragDropProvider,
  DraggableMapNode,
  DraggableMessageBox,
  DraggableMapNodeDirectionsMessageBox,
  DroppableMap,
}
