import React from 'react'
import styled from 'styled-components'
import { appStateManager, navigation, Types } from '../interactive-maps'
import { getStoreAreasArr, getStoreAreasByFloorID, getStoreArea } from './map'

const { useAppSelector, appSetters, appUtils } = appStateManager

const StyledAreaListItem = styled.li<{ active: boolean }>`
  color: ${({ active }) => (active ? 'red' : 'black')};
  padding: 0.5em 0;
  cursor: pointer;
`

const useAreaItems = (activeAreaID: Types.ActiveArea, floorID: string) => {
  const mapDispatch = navigation.stateManager.useNavigationDispatch()
  const { activeArea } = appSetters
  return React.useMemo(
    () =>
      getStoreAreasByFloorID(floorID).map(area => {
        return (
          <StyledAreaListItem
            key={area.id}
            active={area.id === activeAreaID}
            onClick={() => {
              activeArea.setID(area.id)
              const storeArea = getStoreArea(area.id)
              mapDispatch({ type: 'END_POINT', payload: storeArea })
            }}
          >
            {area.label}
          </StyledAreaListItem>
        )
      }),
    [activeAreaID, floorID, activeArea, mapDispatch]
  )
}

const AreasControls: React.FC<{
  floorID: string
}> = ({ floorID }) => {
  const activeAreaID = useAppSelector(appUtils.getActiveAreaID)
  const areaList = useAreaItems(activeAreaID, floorID)

  return (
    <div>
      <ul style={{ textAlign: 'left' }}>{areaList}</ul>
    </div>
  )
}

export default AreasControls
