import React from 'react'
import styled from 'styled-components'
import { utils } from '../interactive-maps'

const StyledAreaListItem = styled.li<{ active: boolean }>`
  color: ${({ active }) => (active ? 'red' : 'black')};
  padding: 0.5em 0;
  cursor: pointer;
`

const AreasControls: React.FC<{}> = () => {
  const areaItems = utils.useAreaItemsByFloor()
  const areaElements = React.useMemo(
    () =>
      areaItems.map(area => {
        return (
          <StyledAreaListItem
            key={area.id}
            active={area.isActive}
            onClick={area.onClick}
          >
            {area.label}
          </StyledAreaListItem>
        )
      }),
    [areaItems]
  )
  return (
    <div>
      <ul style={{ textAlign: 'left' }}>{areaElements}</ul>
    </div>
  )
}

export default AreasControls
