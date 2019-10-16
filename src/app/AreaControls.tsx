import React from 'react'
import styled from 'styled-components'
import { appStateManager, Types, utils } from '../interactive-maps'
import { getStoreAreasByFloorID, getStoreArea } from './map'

const { useAppSelector, appUtils } = appStateManager

const StyledAreaListItem = styled.li<{ active: boolean }>`
  color: ${({ active }) => (active ? 'red' : 'black')};
  padding: 0.5em 0;
  cursor: pointer;
`

const useAreaItems = (activeAreaID: Types.ActiveArea, floorID: string) => {
  const wayfinder = utils.useWayfinder()
  return React.useMemo(
    () =>
      getStoreAreasByFloorID(floorID).map(area => {
        return (
          <StyledAreaListItem
            key={area.id}
            active={area.id === activeAreaID}
            onClick={() => {
              const storeArea = getStoreArea(area.id)
              wayfinder(storeArea)
            }}
          >
            {area.label}
          </StyledAreaListItem>
        )
      }),
    [activeAreaID, floorID, wayfinder]
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
