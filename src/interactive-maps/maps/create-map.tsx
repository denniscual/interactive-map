import React from 'react'
import styled from 'styled-components'
import MapEditor from '../map-editor'
import { Wayfinder } from '../wayfinder'
import { useAppSelector, appUtils, AppState } from '../app-state-manager'
import { useDataSource } from '../contexts'
import * as types from '../types'

const StyledMapContainer = styled.svg<{
  mapCSS: string
  activeAreaCSS: string
  otherCSS?: string
}>`
  ${({ mapCSS }) => mapCSS}
  ${({ activeAreaCSS }) => activeAreaCSS}
  ${({ otherCSS }) => otherCSS}
`

// Composing the active area state css. If the areas are array, we gonna create
// an N selectors based in N areas.length. Or else, only 1 selector.
const composeActiveAreaCSS = (areas: types.ActiveArea, activeAreaCSS: string) =>
  Array.isArray(areas)
    ? areas
        .map(
          area => `
                #${area} {
                  ${activeAreaCSS}
                }
              `
        )
        .reduce((composedCSS, css) => composedCSS.concat(css), '')
    : `
      #${areas} {
        ${activeAreaCSS}
      }
    ` // Function composeActiveAreaCSS

const CopiedStartpointArea: React.FC<{ startpoint: string }> = ({
  startpoint,
}) => {
  const storeAreas = useAppSelector(appUtils.getStoreAreas)
  const startpointArea = storeAreas[startpoint]
  return (
    <g id="copied-startpoint-area" className="portal-area">
      <use href={`#${startpointArea.id}`} />{' '}
    </g>
  )
}

const CopiedEndpointArea: React.FC = () => {
  const activeArea = useAppSelector(appUtils.getActiveArea)
  const copiedSVG = React.useMemo(
    () =>
      Array.isArray(activeArea.id) ? (
        activeArea.id.map(area => <use key={area} href={`#${area}`} />)
      ) : (
        <use href={`#${activeArea.id}`} />
      ),
    [activeArea.id]
  )
  return activeArea.isVisible ? (
    <g id="copied-endpoint-area">{copiedSVG}</g>
  ) : null
}

type MapComponent = {
  elements: JSX.Element
  nodes: types.MapNodesProps[]
  props: React.SVGAttributes<SVGElement>
  css: types.MapCSS // optional css styles for map
  floorID: string
}

const createNodeElements = (nodes: types.MapNodesProps[]) =>
  nodes.map(node => <circle key={node.id} {...node} />)

type Modifiers = {
  nodesVisible: boolean
  mapEditorVisible: boolean
  voiceDirectionIsEnabled: boolean
}

const getWelcomeSpeechAndActiveAreaID = (state: AppState) => ({
  welcomeSpeech: state.welcomeSpeech,
  activeAreaID: state.activeArea.id,
})

const createMapComponent = (map: MapComponent, modifiers: Modifiers) => {
  const { mapEditorVisible, nodesVisible, voiceDirectionIsEnabled } = modifiers
  const { elements: mapElements, nodes, props, css, floorID } = map

  // ------------- Map ------------------- //
  const Map: types.MapComponent = ({ route, startpointMarker, children }) => {
    // ------ ActiveAreas --------- //
    const { welcomeSpeech, activeAreaID } = useAppSelector(
      getWelcomeSpeechAndActiveAreaID
    )
    // ------ Modify the styles of MapContainer ------------- //
    const activeAreaCSS = composeActiveAreaCSS(activeAreaID, css.activeArea)

    const nodeElements = React.useMemo(() => createNodeElements(nodes), [])

    // TODO: Reduce the duplication in here.
    if (mapEditorVisible) {
      return (
        <MapEditor
          svgProps={props}
          mapCSS={css.map}
          activeAreaCSS={activeAreaCSS}
          mapNodesElements={nodeElements}
          floorID={floorID}
        >
          {mapElements}
          {nodesVisible && nodeElements}
          {/* If voiceDirectionIsEnabled, we need to show the Wayfinder in delay manner
        through waiting the welcomeSpeech becomes true */}
          {voiceDirectionIsEnabled ? (
            welcomeSpeech && <Wayfinder route={route} />
          ) : (
            <Wayfinder route={route} />
          )}
          <CopiedStartpointArea startpoint={route.startpoint} />
          <CopiedEndpointArea />
          {children}
          {startpointMarker}
        </MapEditor>
      )
    }

    return (
      <StyledMapContainer
        {...props}
        mapCSS={css.map}
        activeAreaCSS={activeAreaCSS}
      >
        {mapElements}
        {nodesVisible && nodeElements}
        {/* If voiceDirectionIsEnabled, we need to show the Wayfinder in delay manner
        through waiting the welcomeSpeech becomes true */}
        {voiceDirectionIsEnabled ? (
          welcomeSpeech && <Wayfinder route={route} />
        ) : (
          <Wayfinder route={route} />
        )}
        <CopiedStartpointArea startpoint={route.startpoint} />
        <CopiedEndpointArea />
        {children}
        {startpointMarker}
      </StyledMapContainer>
    )
  }

  return Map
}

export default createMapComponent
