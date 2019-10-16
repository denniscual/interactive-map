import React, { useMemo } from 'react'
import { utils } from '../interactive-maps'

const FloorControls = () => {
  const floorItems = utils.useFloorItems()

  const switchers = useMemo(() => {
    return floorItems.map(floor => {
      return floor.isActive ? (
        <span key={floor.id} style={{ fontSize: 14, marginRight: 8 }}>
          {floor.label}
        </span>
      ) : (
        <button
          key={floor.id}
          style={{ fontSize: 14, marginRight: 8 }}
          onClick={floor.onClick}
        >
          {floor.label}
        </button>
      )
    })
  }, [floorItems])

  return (
    <div>
      <div>{switchers}</div>
    </div>
  )
}
export default FloorControls
