import React from 'react'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import AreasControls from './AreaControls'
import FloorControls from './FloorControls'
import NavigationArea from './NavigationArea'
import InteractiveMaps, {
  appStateManager,
  useInteractiveMaps,
  Types,
} from '../interactive-maps'
import dataSource from './mock-data'

const { useAppSelector, appUtils } = appStateManager

const StyledSection = styled.section`
  margin: 4em;
  text-align: center;
`

/**
 * Creating a transition effect between maps using react-spring
 */
const useMapTransition1 = (
  activeFloorID: string,
  maps: Types.InteractiveMaps
) => {
  // create transition effect
  const transitions = useTransition(activeFloorID, null, {
    from: { position: 'relative', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return React.useMemo(() => {
    const transitionedMaps = transitions.map(({ item, key, props }) => {
      const activeMap = maps.find(map => map.id === activeFloorID)
      return (
        <animated.div key={key} style={props}>
          {activeMap && <activeMap.Component />}
        </animated.div>
      )
    })
    return transitionedMaps
  }, [activeFloorID, maps, transitions])
}

const TestInteractiveMaps: React.FC = () => {
  const activeFloorID = useAppSelector(appUtils.getActiveFloor)
  const maps = useInteractiveMaps()
  const transitionedMaps = useMapTransition1(activeFloorID, maps)
  return (
    <StyledSection>
      <div style={{ display: 'flex' }}>
        {activeFloorID !== '' && <AreasControls floorID={activeFloorID} />}
        <div style={{ width: '100%' }}>
          <FloorControls />
          <NavigationArea />
          {transitionedMaps}
        </div>
      </div>
    </StyledSection>
  )
}

const App: React.FC = () => (
  <InteractiveMaps dataSource={dataSource}>
    <TestInteractiveMaps />
  </InteractiveMaps>
)

export default App
