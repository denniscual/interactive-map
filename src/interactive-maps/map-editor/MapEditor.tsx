import React from 'react'
import styled from 'styled-components'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import { assoc, omit } from 'ramda'
import * as tools from './toolbox'
import * as rootMapNodes from '../map-nodes'
import * as DnD from './drag-and-drop'
import * as utils from './__utils__'
import * as messageBoxCoordinates from './message-box-coordinates'
import { generatedCodes } from './codes'
import { nodes as nodeUtils, svg } from '../__utils__'
import { useAppSelector, appUtils, appSetters } from '../app-state-manager'
import { MapNodes } from '../map-nodes/types'
import { css } from 'emotion'
import * as types from '../types'

const fieldGroupCSS = css`
  margin-bottom: 1em;

  label {
    display: block;
    margin-bottom: 0.5em;
  }

  input {
    font-size: 0.9rem;
    padding: 0.3em;
  }
`

const fieldArrayCSS = css`
  list-style-type: none;
  padding: 0;
  border: 1px solid #bbbbbb;
  padding: 0.5em;

  > li {
    border-bottom: 1px solid #bbbbbb;

    &:last-child {
      border-bottom: 0;
    }
  }
`

const formButtonCSS = css`
  font-size: 0.9rem;
  margin-right: 0.5em;
`

type StoreAreaInput = Omit<types.StoreArea, 'floorID' | 'description'>
const initStoreArea: StoreAreaInput = {
  id: '',
  label: '',
  type: 'store',
  categories: [],
  nodes: [],
}

const MapFieldArray: React.FC<{
  values: StoreAreaInput
  name: keyof StoreAreaInput
}> = ({ values, name }) => {
  const arrValue = values[name]
  return (
    <FieldArray
      name={name}
      render={helpers => (
        <ul className={fieldArrayCSS}>
          {arrValue && Array.isArray(arrValue) && arrValue.length > 0 ? (
            arrValue.map((_, idx) => (
              <li key={idx}>
                <label>{name} ID</label>
                <Field name={`${name}.${idx}`} />
                <button
                  type="button"
                  onClick={() => helpers.remove(idx)} // remove a friend from the list
                >
                  -
                </button>
                <button
                  className={formButtonCSS}
                  type="button"
                  onClick={() => helpers.insert(idx, '')} // insert an empty string at a position
                >
                  +
                </button>
              </li>
            ))
          ) : (
            <button
              className={formButtonCSS}
              type="button"
              onClick={() => helpers.push('')}
            >
              Add a {name}
            </button>
          )}
        </ul>
      )}
    />
  )
}

const StoreAreaInspector: React.FC<{
  storeAreas: types.StoreAreas
  activeFloorID: string
}> = ({ storeAreas, activeFloorID }) => {
  const activeAreaID = useAppSelector(appUtils.getActiveAreaID) as string
  let storeArea = omit(
    ['floorID', 'description'],
    storeAreas[activeAreaID] || initStoreArea
  ) as StoreAreaInput

  return (
    <Formik
      initialValues={storeArea}
      validate={values => {
        let errors: Partial<{
          id: string
          label: string
        }> = {}

        if (!values.id) {
          errors.id = 'Required'
        } else if (!values.label) {
          errors.label = 'Required'
        }
        return errors
      }}
      onSubmit={(values, { resetForm }) => {
        const existingArea = storeAreas[values.id]
        if (existingArea) {
          appSetters.storeAreas.setArea({
            ...existingArea,
            ...values,
          })
        } else {
          appSetters.storeAreas.setArea({
            ...values,
            floorID: activeFloorID,
          })
        }
        resetForm()
      }}
      enableReinitialize
    >
      {({ isSubmitting, values, resetForm }) => (
        <Form>
          <div className={fieldGroupCSS}>
            <label>Area ID</label>
            <Field type="id" name="id" />
            <ErrorMessage name="id" component="div" />
          </div>
          <div className={fieldGroupCSS}>
            <label>Label</label>
            <Field type="label" name="label" />
            <ErrorMessage name="label" component="div" />
          </div>
          <div className={fieldGroupCSS}>
            <label>Area Type</label>
            <Field type="type" name="type" />
            <ErrorMessage name="type" component="div" />
          </div>
          <div className={fieldGroupCSS}>
            <label>Area Nodes</label>
            <MapFieldArray name="nodes" values={values} />
          </div>
          <div className={fieldGroupCSS}>
            <label>Area Categories</label>
            <MapFieldArray name="categories" values={values} />
          </div>
          <button
            className={formButtonCSS}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button
            className={formButtonCSS}
            type="button"
            onClick={() => resetForm()}
          >
            Reset
          </button>
        </Form>
      )}
    </Formik>
  )
}

// TODO: activeTool could handle a string or array type.
const activeToolReducer = (
  state: types.ActiveToolTypes,
  action: types.ActiveToolTypes
) => {
  if (action) {
    return action
  }
  return state
}

const mapEditorCSS = css`
  display: flex;
  text-align: left;
`

const StyledMapContainer = styled.svg<{
  mapCSS: string
  activeAreaCSS: string
  activeTool: types.ActiveToolTypes
}>`
  ${({ mapCSS }) => mapCSS}
  ${({ activeAreaCSS }) => activeAreaCSS}
  width: 100%;
  height: 100%;
  background-color: #6d6d6d;
  border: 2px solid #000000;
  cursor: ${({ activeTool }) => utils.mapNodeHoverIcon(activeTool)};
`

const panelCSS = css`
  width: 20%;
  margin-right: 2em;
`

const mapNodeListCSS = css`
  height: 80vh;
  overflow: auto;

  & > li {
    margin-bottom: 0.8em;

    &:hover {
      color: blue;
      cursor: pointer;
    }
  }
`

// FIXME: We gonna fix the issue of node re-ordering when updating a map node
// Instead of using Object or Array, we gonna use Map.
const MapNodesPanel: React.FC<{
  setMapNodeMessageBox: React.Dispatch<JSX.Element>
  activeMapNode: string
  setActiveMapNode: React.Dispatch<string>
}> = ({ activeMapNode, setActiveMapNode, setMapNodeMessageBox }) => {
  const mapNodes = rootMapNodes.mapNodesStateManager.useMapNodes()
  const activeFloorID = useAppSelector(appUtils.getActiveFloor)
  const mapNodeElements = React.useMemo(() => {
    const handleActiveNode: React.MouseEventHandler = e => {
      const id = e.currentTarget.id
      setActiveMapNode(id)
      setMapNodeMessageBox(<g />)
    }
    return mapNodes
      .filter(node => node['data-floor-id'] === activeFloorID)
      .map(node => (
        <li
          key={node['data-key-id']}
          id={node.id}
          onClick={handleActiveNode}
          style={{ color: node.id === activeMapNode ? 'blue' : '#000000' }}
        >
          {node.id}
        </li>
      ))
  }, [
    activeFloorID,
    activeMapNode,
    mapNodes,
    setActiveMapNode,
    setMapNodeMessageBox,
  ])
  return (
    <div className={panelCSS}>
      <header>
        <h2>Map Node List</h2>
      </header>
      <ul css={mapNodeListCSS}>{mapNodeElements}</ul>
    </div>
  )
}

const directNodesCSS = css`
  display: flex;
  flex-direction: row;
  justify-content: left;
  list-style-type: none;
  padding: 1em;
  border: 1px solid #d1d1d1;
  flex-wrap: wrap;

  li {
    position: relative;
    padding: 0.5em;
    background-color: #282828;
    color: #ffffff;
    border-radius: 4px;
    margin-bottom: 1em;

    span {
      position: absolute;
      top: -14px;
      right: 0;
      display: block;
      background-color: red;
      padding: 0.4em;
      font-size: 0.7rem;
      font-weight: 800;
      user-select: none;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Node Directions use for MapNodeInspector
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

const useNodeDirections = (
  tempMapNode: TempMapNodeProps,
  mapNodesDirections: MapNodes
) => {
  const mapNodesDirectionsDispatch = rootMapNodes.mapNodesDirectionsStateManager.useMapNodesDirectionsDispatch()
  return React.useMemo(() => {
    let nodeDirections: JSX.Element[] = []
    if (tempMapNode && tempMapNode['data-key-id'] !== '') {
      const keyID = tempMapNode['data-key-id']
      const ownNodeDirections = mapNodesDirections.get(keyID)
      if (ownNodeDirections) {
        // TODO: We need to add a cleanup feature. When one of the node is remove
        // in `nodes`, then we need to delete this node direction.
        for (const [nodes, direction] of ownNodeDirections.entries()) {
          const nodesElement = nodes
            .reduce((acc, value) => acc.concat(`${value} `), '')
            .trim()
          const deleteNodeDirections: React.MouseEventHandler = () => {
            mapNodesDirectionsDispatch({
              type: 'DELETE_DIRECTION',
              meta: { key: keyID, directionKey: nodes },
            })
          }
          const directionElement = (
            <li key={nodesElement}>
              <p>Nodes: {nodesElement}</p>
              <p>Direction: {direction}</p>
              <button onClick={deleteNodeDirections}>Delete direction</button>
            </li>
          )
          nodeDirections.push(directionElement)
        }
      }
    }
    return nodeDirections
  }, [tempMapNode, mapNodesDirections, mapNodesDirectionsDispatch])
}

type TempMapNodeProps = Pick<
  types.MapNodesProps,
  'id' | 'cx' | 'cy' | 'data-direct-nodes' | 'data-floor-id' | 'data-key-id'
>

const MapNodeInput: React.FC<{
  field: keyof TempMapNodeProps
  tempMapNode: string | number
  setTempMapNode: React.Dispatch<React.SetStateAction<TempMapNodeProps>>
  disabled?: boolean
}> = ({ field, tempMapNode, setTempMapNode, disabled = false }) => {
  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget
    setTempMapNode(prevMapNode => ({
      ...prevMapNode,
      [field]: value,
    }))
  }
  return (
    <input
      disabled={disabled}
      name={field}
      value={tempMapNode}
      onChange={handleTextChange}
    />
  )
}

const initTempMapNode = {
  id: '',
  cx: 0,
  cy: 0,
  'data-label': '',
  'data-direct-nodes': [],
  'data-area-type': '',
  'data-area-id': '',
  'data-floor-id': '',
  'data-key-id': '',
}

const spanErrorCSS = css`
  color: red;
  margin-top: 0.3em;
  display: block;
`

const MapNodeInspector: React.FC<{
  activeMapNodeID: string
  setActiveMapNodeID: React.Dispatch<string>
  floorID: string
}> = React.memo(({ activeMapNodeID, setActiveMapNodeID, floorID }) => {
  const [tempMapNode, setTempMapNode] = React.useState<TempMapNodeProps>(
    initTempMapNode
  )
  const [fieldErrors, setFieldErrors] = React.useState<string[]>([])
  const mapNodes = rootMapNodes.mapNodesStateManager.useMapNodes()
  const mapNodesObj = rootMapNodes.mapNodesStateManager.useMapNodesObj()
  const activeMapNode = rootMapNodes.mapNodesStateManager.useMapNodesObj()[
    activeMapNodeID
  ]
  const mapNodeDispatch = rootMapNodes.mapNodesStateManager.useMapNodesDispatch()
  // Map nodes directions
  const mapNodesDirections = rootMapNodes.mapNodesDirectionsStateManager.useMapNodesDirections()

  // Persisting the activeMapNode into tempMapNode
  React.useEffect(() => {
    if (activeMapNode) {
      setTempMapNode(activeMapNode)
    } else {
      setTempMapNode(initTempMapNode)
    }
  }, [activeMapNode])

  const handleNodeUpdate: React.FormEventHandler = e => {
    e.preventDefault()

    // Validate fields
    // If not valid
    if (tempMapNode.id === '') {
      setFieldErrors(['id'])
    }
    // If valid
    else {
      // const updatedMapNode = tempMapNode['data-area-type'] === 'store'
      //     ?
      //     : tempMapNode
      mapNodeDispatch({
        type: 'UPDATE_NODE',
        payload: Object.assign(
          {},
          activeMapNode,
          assoc('data-floor-id', floorID, tempMapNode)
        ),
        meta: { oldMapNodeID: activeMapNodeID },
      })
      setActiveMapNodeID(tempMapNode.id)

      // clear field error
      setFieldErrors([])
    }
  }

  const handleNodeCancelUpdate: React.MouseEventHandler = e => {
    setTempMapNode(activeMapNode)
  }

  const handleClearErrorFields: React.FocusEventHandler = e => {
    setFieldErrors([])
  }

  const nodeDirections = useNodeDirections(tempMapNode, mapNodesDirections)

  const directNodes = React.useMemo(() => {
    if (tempMapNode) {
      const newDirectNodes = nodeUtils.createNewDirectNodes(
        mapNodes,
        tempMapNode
      )
      return newDirectNodes
        .filter(node => node !== '') // only show the nodes which is not empty
        .map((nodeID, idx) => {
          const handleDeleteDirectNode: React.MouseEventHandler = e => {
            const clickedMapNode = mapNodesObj[nodeID]
            const newDirectNodes = tempMapNode['data-direct-nodes'].filter(
              directNode => directNode !== clickedMapNode['data-key-id']
            )
            mapNodeDispatch({
              type: 'UPDATE_DIRECT_NODES',
              payload: newDirectNodes,
              meta: {
                id: tempMapNode.id,
              },
            })
          }

          return (
            <li key={idx}>
              {nodeID}
              <span id={nodeID} onClick={handleDeleteDirectNode}>
                X
              </span>
            </li>
          )
        })
    }
    return []
  }, [mapNodeDispatch, mapNodes, mapNodesObj, tempMapNode])

  return (
    <div onBlur={handleClearErrorFields}>
      <form onSubmit={handleNodeUpdate}>
        <div className={fieldGroupCSS}>
          <label>Node ID</label>
          <MapNodeInput
            field="id"
            tempMapNode={tempMapNode.id}
            setTempMapNode={setTempMapNode}
            disabled
          />
          {fieldErrors.length > 0 && fieldErrors.includes('id') && (
            <div>
              <span className={spanErrorCSS}>This field is required.</span>
            </div>
          )}
        </div>
        <div className={fieldGroupCSS}>
          <label>Node Directions</label>
          <ul className={fieldArrayCSS}>{nodeDirections}</ul>
        </div>
        <div className={fieldGroupCSS}>
          <label>CX Coordinate</label>
          <MapNodeInput
            field="cx"
            tempMapNode={tempMapNode.cx}
            setTempMapNode={setTempMapNode}
          />
        </div>
        <div className={fieldGroupCSS}>
          <label>CY Coordinate</label>
          <MapNodeInput
            field="cy"
            tempMapNode={tempMapNode.cy}
            setTempMapNode={setTempMapNode}
          />
        </div>
        <div className={fieldGroupCSS}>
          <label>Direct Nodes</label>
          <ul className={directNodesCSS}>{directNodes}</ul>
        </div>
        <button hidden />
      </form>
      <div>
        <button
          style={{ marginRight: '0.4em' }}
          onClick={handleNodeCancelUpdate}
        >
          Cancel
        </button>
        <button onClick={handleNodeUpdate}>Update</button>
      </div>
    </div>
  )
})

const directNodesPathCSS = css`
  stroke: #607d8b;
  stroke-width: 7px;
`

const DirectNodesPaths: React.FC<{ activeMapNodeID: string }> = React.memo(
  ({ activeMapNodeID }) => {
    const mapNodes = rootMapNodes.mapNodesStateManager.useMapNodes()
    let paths: JSX.Element | JSX.Element[] = <path />
    // creating direct nodes lines
    if (activeMapNodeID !== '') {
      paths = utils
        .createDirectNodePaths(activeMapNodeID, mapNodes)
        .map((directNodePath, idx) => (
          <path key={idx} className={directNodesPathCSS} d={directNodePath} />
        ))
    }
    return <g id="map-node-direct-nodes">{paths}</g>
  }
)

const StyledPath = styled.path<{ stroke: string }>`
  stroke: ${({ stroke }) => stroke};
  stroke-width: 7px;
  stroke-dasharray: 8;
`

// TODO: We gonna create another Generated Codes component to show the map node directions code.
// Right now, we group the directions then merge it in application level. What we gonna do
// is when creating direction, we don't need to group the directions instead put it to
// a single variable code. Use a dedicated Codes component in here.
const MapNodeDirectionPaths: React.FC<{ activeMapNodeID: string }> = ({
  activeMapNodeID,
}) => {
  const mapNodes = rootMapNodes.mapNodesStateManager.useMapNodes()
  const mapNodesDirections = rootMapNodes.mapNodesDirectionsStateManager.useMapNodesDirections()
  const node = mapNodes.find(({ id }) => id === activeMapNodeID)
  if (activeMapNodeID === '' || !node) {
    return null
  }
  const nodeWithDirections = mapNodesDirections.get(node['data-key-id'])
  if (!nodeWithDirections) {
    return null
  }
  let pointsWithDirection: {
    id: string
    points: number[][]
    direction: rootMapNodes.Types.DirectionType
  }[] = []
  nodeWithDirections.forEach((value, key) => {
    const firstNode = mapNodes.find(node => node['data-key-id'] === key[0])
    const secondNode = mapNodes.find(node => node['data-key-id'] === key[1])
    if (firstNode && secondNode) {
      pointsWithDirection.push({
        id: `node-${firstNode.id}-${secondNode.id}`,
        points: [[firstNode.cx, firstNode.cy], [secondNode.cx, secondNode.cy]],
        direction: value,
      })
    }
  })
  return (
    <g id="map-node-directions">
      {pointsWithDirection.map(({ id, points, direction }) => {
        const path = svg.svgShapePath(points, svg.lineCommand)
        const stroke = direction === 'LEFT' ? 'green' : '#e400ff'
        const handleClick: React.MouseEventHandler = () => {
          console.log('click')
        }
        return (
          <StyledPath onClick={handleClick} key={id} stroke={stroke} d={path} />
        )
      })}
    </g>
  )
}

const StyleDraggableMapNode = styled(DnD.DraggableMapNode)`
  fill: ${({ isHighlighted }) => (isHighlighted ? 'blue' : 'red')};

  &:hover {
    cursor: ${({ activeTool }) => utils.mapNodeHoverIcon(activeTool)};
  }
`

const useMapNodeElements = ({
  activeMapNodeID,
  activeTool,
  setMapNodeMessageBox,
}: {
  activeMapNodeID: {
    activeMapNodeID: string
    setActiveMapNodeID: React.Dispatch<string>
  }
  activeTool: types.ActiveTool
  setMapNodeMessageBox: React.Dispatch<JSX.Element>
}) => {
  const mapMessageBoxCoordinatesDispatch = messageBoxCoordinates.useMessageBoxCoordinatesDispatch()
  const mapNodes = rootMapNodes.mapNodesStateManager.useMapNodes()
  const mapNodesObj = rootMapNodes.mapNodesStateManager.useMapNodesObj()
  const mapNodesDispatch = rootMapNodes.mapNodesStateManager.useMapNodesDispatch()
  const activeMapNode = mapNodesObj[activeMapNodeID.activeMapNodeID]
  // map node direction
  const [mapNodeDirections, setMapNodeDirections] = React.useState<string[]>([])

  // Handle the map node direction
  React.useEffect(() => {
    // Show the map node message box for updating its direction
    if (mapNodeDirections.length > 1) {
      setMapNodeMessageBox(
        <DnD.DraggableMapNodeDirectionsMessageBox
          node={activeMapNode}
          directions={mapNodeDirections}
          activeTool={activeTool}
          setMapNodeMessageBox={setMapNodeMessageBox}
          mapNodesDispatch={mapNodesDispatch}
        />
      )
      // Reset the map node direction
      setMapNodeDirections([])
    }
  }, [
    activeMapNode,
    activeTool,
    mapNodeDirections,
    mapNodesDispatch,
    setMapNodeMessageBox,
  ])

  // Check if user is not modifying map node.
  const isUserNotModifyingMapNode = React.useMemo(() => {
    return (
      activeTool.activeTool !== 'NODES_ADDER' &&
      activeTool.activeTool !== 'ADD_DIRECT_NODES' &&
      activeTool.activeTool !== 'ADD_NODE_DIRECTION'
    )
  }, [activeTool.activeTool])

  return React.useMemo(() => {
    // Click handler for map node.
    const handleMapNodeButton: React.MouseEventHandler = e => {
      const { currentTarget } = e
      if (isUserNotModifyingMapNode) {
        activeMapNodeID.setActiveMapNodeID(currentTarget.id)
        const x = parseInt(currentTarget.getAttribute('cx') as string)
        const y = parseInt(currentTarget.getAttribute('cy') as string)
        mapMessageBoxCoordinatesDispatch({ x, y })

        setMapNodeMessageBox(
          <DnD.DraggableMessageBox
            id={currentTarget.id}
            activeTool={activeTool}
            setMapNodeMessageBox={setMapNodeMessageBox}
            mapNodesDispatch={mapNodesDispatch}
            // mapNodeDirectionCount={mapNodeDirectionCount}
          />
        )
      }

      // Adding direct nodes for map node
      if (
        activeTool.activeTool === 'ADD_DIRECT_NODES' &&
        activeMapNodeID.activeMapNodeID !== currentTarget.id // void if the click was fired on it self.
      ) {
        // we gonna persist the keyID not the ID because ID is mutable. Instead
        // persist the value which is not mutable which is keyID.
        const addedMapNode = mapNodesObj[currentTarget.id]
        mapNodesDispatch({
          type: 'UPDATE_DIRECT_NODES',
          payload: [
            ...activeMapNode['data-direct-nodes'],
            addedMapNode['data-key-id'],
          ],
          meta: {
            id: activeMapNodeID.activeMapNodeID,
          },
        })
      }

      // Adding direction for map node
      if (
        activeTool.activeTool === 'ADD_NODE_DIRECTION' &&
        activeMapNodeID.activeMapNodeID !== currentTarget.id // void if the click was fired on it self.
      ) {
        // When clicking to direction button in message box, what we are trying to do is to add the direction of the pair nodes for the base node.
        // We gonna use this types for map node directions:
        // type TurnDirection = 'RIGHT' | 'LEFT'

        // get the current target node
        const currentMapNode = mapNodesObj[currentTarget.id]

        if (currentMapNode) {
          setMapNodeDirections(current =>
            current.concat(currentMapNode['data-key-id'])
          )
        }
      }
    }

    const handleMouseEnter: React.MouseEventHandler = e => {
      if (isUserNotModifyingMapNode) {
        activeTool.dispatch('MOVE_NODE')

        // set the active map node
        activeMapNodeID.setActiveMapNodeID(e.currentTarget.id)
      }
    }

    const handleMouseLeave: React.MouseEventHandler = e => {
      if (isUserNotModifyingMapNode) {
        activeTool.dispatch('PAN_AND_ZOOM')
      }
    }

    return mapNodes.map(node => {
      return (
        <StyleDraggableMapNode
          isHighlighted={activeMapNodeID.activeMapNodeID === node.id}
          onClick={handleMapNodeButton}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          activeTool={activeTool.activeTool}
          key={node['data-key-id']}
          id={node.id}
          r={15}
          fill="red"
          cx={node.cx}
          cy={node.cy}
          data-key-id={node['data-key-id']}
          data-direct-nodes={nodeUtils.createNewDirectNodes(mapNodes, node)}
          data-floor-id={node['data-floor-id']}
        />
      )
    })
  }, [
    mapNodes,
    isUserNotModifyingMapNode,
    activeTool,
    activeMapNodeID,
    mapMessageBoxCoordinatesDispatch,
    setMapNodeMessageBox,
    mapNodesDispatch,
    mapNodesObj,
    activeMapNode,
  ])
}

type MapEditorProps = {
  svgProps: React.SVGAttributes<SVGElement>
  mapCSS: string
  activeAreaCSS: string
  mapNodesElements: types.MapNodeElement[]
  floorID: string
}

const InternalMapEditor: React.FC<MapEditorProps> = ({
  svgProps,
  mapCSS,
  activeAreaCSS,
  floorID,
  children,
}) => {
  const { activeFloorID, storeAreas } = useAppSelector(state => ({
    activeFloorID: state.activeFloor,
    storeAreas: state.storeAreas,
  }))
  const [activeMapNode, setActiveMapNode] = React.useState('')
  const [activeTool, activeToolDispatch] = React.useReducer(
    activeToolReducer,
    'PAN_AND_ZOOM'
  )
  const mapNodeDispatch = rootMapNodes.mapNodesStateManager.useMapNodesDispatch()
  const messageBoxCoordinateDispatch = messageBoxCoordinates.useMessageBoxCoordinatesDispatch()
  const [mapNodeMessageBox, setMapNodeMessageBox] = React.useState<JSX.Element>(
    <rect />
  )
  const mapNodeElements = useMapNodeElements({
    activeMapNodeID: {
      activeMapNodeID: activeMapNode,
      setActiveMapNodeID: setActiveMapNode,
    },
    activeTool: {
      activeTool,
      dispatch: activeToolDispatch,
    },
    setMapNodeMessageBox,
  })

  const svgEl = React.useRef<SVGSVGElement>(null)
  const domRect = React.useMemo(
    () => utils.createDOMRect(svgProps.viewBox || ''),
    [svgProps.viewBox]
  )
  const [viewBox, setViewBox] = React.useState<DOMRect>(domRect)

  // Attaching keydown event listener to window object.
  React.useEffect(() => {
    const handleEscapeKey: types.EventListener<Window, KeyboardEvent> = e => {
      if (e.key === 'Escape') {
        activeToolDispatch('PAN_AND_ZOOM')
        setMapNodeMessageBox(<g />)
      }
    }
    window.addEventListener('keydown', handleEscapeKey)
    return () => window.removeEventListener('keydown', handleEscapeKey)
  }, [])

  // Close the map node message box if the activeTool is PAN_AND_ZOOM
  // React.useEffect(() => {
  //   if (activeTool === 'PAN_AND_ZOOM') {
  //     setMapNodeMessageBox(<g />)
  //   }
  // }, [activeTool])

  // ------------ Toolbox Panel -------------- //
  tools.useMapPanEffect(svgEl, setViewBox, {
    activeTool,
    dispatch: activeToolDispatch,
  })
  const mapZoom = tools.useMapZoom(setViewBox)
  const stringifyViewBox = React.useMemo(() => utils.createViewBox(viewBox), [
    viewBox,
  ])
  const { addingMapNodes } = tools.useMapNodesAdder({
    svgEl,
    activeMapNodeID: activeMapNode,
    setActiveMapNodeID: setActiveMapNode,
    activeTool: {
      activeTool,
      dispatch: activeToolDispatch,
    },
    setMapNodeMessageBox,
  })

  return (
    <DnD.DroppableMap
      mapNodeDispatch={mapNodeDispatch}
      messageBoxCoordinatesDispatch={messageBoxCoordinateDispatch}
      activeTool={activeTool}
    >
      <div className={mapEditorCSS}>
        <div className={panelCSS}>
          <header>
            <h2>Toolbox</h2>
          </header>
          <tools.ToolboxItem
            title="Add Nodes"
            description={`Map Nodes adder tool is ${
              activeTool === types.ToolTypes.NODES_ADDER ? 'on' : 'off'
            }`}
          >
            <button
              onClick={() => {
                activeToolDispatch('NODES_ADDER')
                setActiveMapNode('')
                setMapNodeMessageBox(<g />)
              }}
            >
              Turn on Nodes Adder
            </button>
          </tools.ToolboxItem>
          <tools.ToolboxItem title="Zoom">
            <button onClick={() => mapZoom.zoomIn()}>Zoom in</button>
            <button onClick={() => mapZoom.zoomOut()}>Zoom out</button>
          </tools.ToolboxItem>
          <tools.ToolboxItem title="Node Inspector">
            <MapNodeInspector
              activeMapNodeID={activeMapNode}
              setActiveMapNodeID={setActiveMapNode}
              floorID={floorID}
            />
          </tools.ToolboxItem>
          <tools.ToolboxItem title="Area Inspector">
            <StoreAreaInspector
              activeFloorID={activeFloorID}
              storeAreas={storeAreas}
            />
          </tools.ToolboxItem>
        </div>
        <MapNodesPanel
          activeMapNode={activeMapNode}
          setActiveMapNode={setActiveMapNode}
          setMapNodeMessageBox={setMapNodeMessageBox}
        />
        <StyledMapContainer
          {...svgProps}
          viewBox={stringifyViewBox}
          ref={svgEl}
          mapCSS={mapCSS}
          activeAreaCSS={activeAreaCSS}
          activeTool={activeTool}
          onClick={addingMapNodes}
        >
          {children}
          <DirectNodesPaths activeMapNodeID={activeMapNode} />
          <MapNodeDirectionPaths activeMapNodeID={activeMapNode} />
          {mapNodeElements}
          {mapNodeMessageBox}
        </StyledMapContainer>
      </div>
      <generatedCodes.Nodes
        activeFloorID={activeFloorID}
        mapNodeElements={mapNodeElements}
        storeAreas={storeAreas}
      />
      <generatedCodes.Directions />
      <generatedCodes.Portals storeAreas={storeAreas} />
    </DnD.DroppableMap>
  )
}

const MapEditor: React.FC<MapEditorProps> = props => {
  return (
    <messageBoxCoordinates.MessageBoxCoordinatesProvider>
      <InternalMapEditor {...props} />
    </messageBoxCoordinates.MessageBoxCoordinatesProvider>
  )
}

export default MapEditor
