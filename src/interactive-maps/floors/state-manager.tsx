import React, { createContext, useContext } from 'react'
import ActiveFloor from './ActiveFloor'
import { useConsumeContext } from '../contexts'
import * as types from '../types'

const floorsName = 'FloorsProvider'

const FloorsContext = createContext<types.EnhancedFloors>([])

const FloorsProvider: React.FC<{
  floors: types.EnhancedFloors
  defaultActiveFloorID: string
}> = ({ floors, defaultActiveFloorID, children }) => {
  return (
    <ActiveFloor floors={floors} defaultActiveFloorID={defaultActiveFloorID}>
      <FloorsContext.Provider value={floors}>{children}</FloorsContext.Provider>
    </ActiveFloor>
  )
}

FloorsContext.displayName = floorsName

const useFloors = () => useContext(FloorsContext) as types.EnhancedFloors

const useStoreFloors = () => {
  const storeFloors = useConsumeContext(FloorsContext, floorsName)
  return storeFloors.filter(floor => floor.id !== 'defaultFloor')
}

const useFloorsToObj = () => {
  const floors = useFloors()
  return floors.reduce(
    (obj, value) => ({
      ...obj,
      [value.id]: value,
    }),
    {} as types.EnhancedFloorsObj
  )
}

const useGetFloorByID = (id: string) => {
  const floors = useFloors()
  return React.useMemo(
    () =>
      // assert the return type as Floor type
      floors.find(floor => floor.id === id) as types.EnhancedFloor,
    [floors, id]
  )
}

export {
  FloorsContext,
  FloorsProvider,
  useFloors,
  useFloorsToObj,
  useGetFloorByID,
  useStoreFloors,
}
