import React from 'react'
import Select from 'react-select'
import { navigation, areas, appStateManager } from '../interactive-maps'

const NavigationArea: React.FC = () => {
  const mapNavigation = navigation.stateManager.useNavigation()
  const dispatch = navigation.stateManager.useNavigationDispatch()
  const startpoint = navigation.stateManager.useStartpoint()
  const mapAreas = areas.stateManager.useAreas()
  const { activeArea, activeFloor } = appStateManager.appSetters
  const handleStartpointChange = (selectedOption: any) => {
    // update the active floor. switch it to default startpoint floorID
    activeFloor.setID(startpoint.value.floorID as string)
    dispatch({
      type: 'START_POINT',
      payload: selectedOption,
    })
  }
  const handleEndpointChange = (selectedOption: any) => {
    // update the active floor. switch it to default startpoint floorID
    activeFloor.setID(startpoint.value.floorID as string)
    dispatch({
      type: 'END_POINT',
      payload: selectedOption,
    })
  }
  const handleResetButton: React.MouseEventHandler<HTMLButtonElement> = e => {
    dispatch({
      type: 'RESET',
    })
    // clear active area
    activeArea.setID('RESET')
  }
  return (
    <div style={{ padding: '2em', textAlign: 'left' }}>
      <div style={{ marginTop: 10 }}>
        <label style={{ marginBottom: 5, display: 'block' }} htmlFor="">
          Starting point
        </label>
        <Select
          value={mapNavigation.startpoint}
          onChange={handleStartpointChange}
          options={mapAreas}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label style={{ marginBottom: 5, display: 'block' }} htmlFor="">
          Destination
        </label>
        <Select
          value={mapNavigation.endpoint}
          onChange={handleEndpointChange}
          options={mapAreas}
        />
      </div>
      <div style={{ marginTop: 15 }}>
        <button style={{ fontSize: 14 }} onClick={handleResetButton}>
          Reset mapNavigation
        </button>
      </div>
    </div>
  )
} // React.FC NavigationArea

export default NavigationArea
