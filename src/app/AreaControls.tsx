import React from 'react'
import styled from 'styled-components'
import { appStateManager } from '../interactive-maps'
import { getStoreAreasArr } from './map'

const { useAppSelector, appSetters, appUtils } = appStateManager

const StyledAreaListItem = styled.li<{ active: boolean }>`
  color: ${({ active }) => (active ? 'red' : 'black')};
  padding: 0.5em 0;
  cursor: pointer;
`

const storeAreas = getStoreAreasArr()

const createAreas = (activeAreaID: string, floorID: string) => {
  const { activeArea } = appSetters
  return Object.values(storeAreas)
    .filter(area => area.floorID === floorID)
    .map(area => {
      return (
        <StyledAreaListItem
          key={area.id}
          active={area.id === activeAreaID}
          onClick={() => {
            activeArea.setID(area.id)
          }}
        >
          {area.label}
        </StyledAreaListItem>
      )
    })
}

const AreasControls: React.FC<{
  floorID: string
}> = ({ floorID }) => {
  const activeAreaID = useAppSelector(appUtils.getActiveAreaID)

  const areaList = React.useMemo(
    () => createAreas(activeAreaID as string, floorID),
    [activeAreaID, floorID]
  )

  return (
    <div>
      <ul style={{ textAlign: 'left' }}>{areaList}</ul>
    </div>
  )
}

export default AreasControls
