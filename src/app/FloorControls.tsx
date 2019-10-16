import React, { useMemo } from 'react'
import { floors, utils } from '../interactive-maps'

const FloorControls: React.FC = () => {
  const mapFloors = floors.stateManager.useStoreFloors()
  const switchFloor = utils.useSwitchFloor()

  const switchers = useMemo(() => {
    return mapFloors.map(map => {
      return (
        <button
          key={map.id}
          style={{ fontSize: 14, marginRight: 8 }}
          onClick={() => switchFloor(map.id)}
        >
          {map.label}
        </button>
      )
    })
  }, [mapFloors, switchFloor])

  return (
    <div>
      <div>{switchers}</div>
    </div>
  )
}
export default FloorControls
