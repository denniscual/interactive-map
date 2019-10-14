import React from 'react'
import Select from 'react-select'
import { navigation, appStateManager } from '../interactive-maps'
import { getStoreAreasArr, storeAreas } from './map'

const storeAreasArr = getStoreAreasArr().map(area => ({
  value: area.id,
  label: area.label,
}))

const NavigationArea: React.FC = () => {
  const mapNavigation = navigation.stateManager.useNavigation()
  const dispatch = navigation.stateManager.useNavigationDispatch()
  const startpoint = navigation.stateManager.useStartpoint()
  // const mapAreas = areas.stateManager.useAreas()
  const { activeArea, activeFloor } = appStateManager.appSetters
  const handleStartpointChange = (selectedOption: any) => {
    // update the active floor. switch it to default startpoint floorID
    activeFloor.setID(startpoint.floorID as string)
    dispatch({
      type: 'START_POINT',
      payload: storeAreas[selectedOption.value],
    })
  }
  const handleEndpointChange = (selectedOption: any) => {
    // update the active floor. switch it to default startpoint floorID
    activeFloor.setID(startpoint.floorID as string)
    dispatch({
      type: 'END_POINT',
      payload: storeAreas[selectedOption.value],
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
          value={storeAreasArr.find(
            area => area.value === mapNavigation.startpoint.id
          )}
          onChange={handleStartpointChange}
          options={storeAreasArr}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label style={{ marginBottom: 5, display: 'block' }} htmlFor="">
          Destination
        </label>
        <Select
          value={storeAreasArr.find(
            area => area.value === mapNavigation.endpoint.id
          )}
          onChange={handleEndpointChange}
          options={storeAreasArr}
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
