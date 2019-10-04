import React from 'react'
import styled from 'styled-components'
import {
  floors,
  areas as rootAreas,
  navigation,
  appStateManager,
} from '../interactive-maps'
import invariant from 'invariant'

const { useAppSelector, appSetters, appUtils } = appStateManager

const StyledAreaListItem = styled.li<{ active: boolean }>`
  color: ${({ active }) => (active ? 'red' : 'black')};
  padding: 0.5em 0;
  cursor: pointer;
`

const AreasControls: React.FC<{
  floorID: string
}> = ({ floorID }) => {
  const activeAreaID = useAppSelector(appUtils.getActiveAreaID)
  const { activeArea } = appSetters
  const mapFloor = floors.stateManager.useFloorsToObj()[floorID]
  const mapAreas = rootAreas.stateManager.useAreas()
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()

  const areasByFloor = mapFloor.areasByFloor.map(area => {
    const foundArea = mapAreas.find(mapArea => mapArea.value.areaID === area.id)
    return (
      <StyledAreaListItem
        key={area.id}
        active={area.id === activeAreaID}
        onClick={() => {
          // invariant(
          //   foundArea,
          //   'Destination area is not exist. Please contact the Administrator.'
          // )
          activeArea.setID(area.id)
          // navigationDispatch({ type: 'END_POINT', payload: foundArea })
        }}
      >
        {area.label}
      </StyledAreaListItem>
    )
  })

  const displayActiveArea = React.useMemo(() => {
    const foundArea = mapFloor.areasByFloor.find(area => {
      if (Array.isArray(activeAreaID)) {
        if (area.childs.length > 0) {
          const foundArea = area.childs.find(child =>
            activeAreaID.includes(child)
          )
          return Boolean(foundArea)
        }
      } else {
        return area.id === activeAreaID
      }
      return false
    })
    if (foundArea) {
      return (
        <div>
          <h4>Area ID: {foundArea.id}</h4>
          <p>Area label: {foundArea.label}</p>
        </div>
      )
    }
  }, [activeAreaID, mapFloor.areasByFloor])

  return (
    <div>
      {displayActiveArea}
      <ul style={{ textAlign: 'left' }}>{areasByFloor}</ul>
    </div>
  )
}

export default AreasControls
