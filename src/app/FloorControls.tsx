import React, { useMemo } from 'react'
import { floors, navigation, appStateManager } from '../interactive-maps'

// FIXME: Fix the issue when going to different, excluding the default floor, floor and do
// navigation. It incorrectly behaves because this Component doesn't adopt
// the new navigation logic.
const FloorControls: React.FC = ({ children }) => {
  const mapFloors = floors.stateManager.useFloors()
  const { activeArea, activeFloor } = appStateManager.appSetters
  const navigationDispatch = navigation.stateManager.useNavigationDispatch()

  const switchers = useMemo(() => {
    return mapFloors
      .filter(map => map.id !== 'defaultFloor')
      .map(map => {
        const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
          // update the active floor
          activeFloor.setID(map.id)
          // reset the navigation
          navigationDispatch({ type: 'RESET' })
          // clear the active area when switching floor
          activeArea.setID('RESET')
        }
        return (
          <button
            key={map.id}
            style={{ fontSize: 14, marginRight: 8 }}
            onClick={handleClick}
          >
            {map.label}
          </button>
        )
      })
  }, [mapFloors, activeFloor, navigationDispatch, activeArea])

  return (
    <div>
      <div>{switchers}</div>
    </div>
  )
}
export default FloorControls
