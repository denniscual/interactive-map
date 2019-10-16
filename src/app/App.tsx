import React from 'react'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import AreasControls from './AreaControls'
import FloorControls from './FloorControls'
import InteractiveMaps, { utils } from '../interactive-maps'
import { getMapDataSource } from './map'

const getStoreId = () => {
  const storeIdEnv = (process.env.STORE_ID || '').toUpperCase()

  if (!storeIdEnv && process.env.NODE_ENV === 'development') {
    return 'ES65DFT420'
  }

  return storeIdEnv
}

const StyledSection = styled.section`
  margin: 4em;
  text-align: center;
`

/**
 * Creating a transition effect between maps using react-spring
 */
const useMapTransition1 = () => {
  const mapItems = utils.useMapItems()
  const activeFloor = mapItems.find(map => map.isActive) || { id: '' }
  // create transition effect
  const transitions = useTransition(activeFloor.id, null, {
    from: { position: 'relative', opacity: 0, height: '100%' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return React.useMemo(() => {
    const transitionedMaps = transitions.map(({ item, key, props }) => {
      const activeMap = mapItems.find(map => map.isActive)
      return (
        <animated.div key={key} style={props}>
          {activeMap && <activeMap.Component />}
        </animated.div>
      )
    })
    return transitionedMaps
  }, [mapItems, transitions])
}

const TestInteractiveMaps: React.FC = () => {
  const transitionedMaps = useMapTransition1()
  return (
    <StyledSection>
      <div style={{ display: 'flex' }}>
        <AreasControls />
        <div style={{ width: '100%' }}>
          <FloorControls />
          {transitionedMaps}
        </div>
      </div>
    </StyledSection>
  )
}

const App: React.FC = () => (
  <InteractiveMaps dataSource={getMapDataSource(getStoreId())}>
    <TestInteractiveMaps />
  </InteractiveMaps>
)

export default App
