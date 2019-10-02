import React, { createContext, useContext } from 'react'
import ActiveFloor from './ActiveFloor'
import * as types from '../types'

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

const useFloors = () => useContext(FloorsContext) as types.EnhancedFloors

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

const useAllAreas = () => {
  const floors = useFloors()
  return floors
    .map(floor => floor.areasByFloor)
    .reduce((acc, value) => acc.concat(...value), [])
}

const useAllCategoriesObj = () => {
  const areas = useAllAreas()
  return areas
    .map(area => area.categories)
    .reduce((acc, value) => acc.concat(...value), [])
    .reduce((acc, value) => {
      const foundArea = areas.find(area =>
        area.categories.includes(value)
      ) as types.IncludedArea
      return {
        ...acc,
        [value]: foundArea,
      }
    }, {})
}

/**
 * Grouping the objects based in key.
 */
// const groupBy: <T extends object, K extends keyof T>(
//   list: T[],
//   keyGetter: (value: T) => T[K]
// ) => [K, T][] = (list, keyGetter) => {
//   const map = new Map()
//   list.forEach(item => {
//     const key = keyGetter(item)
//     const collection = map.get(key)
//     if (!collection) {
//       map.set(key, [item])
//     } else {
//       collection.push(item)
//     }
//   })
//   return Array.from(map)
// }

/**
 * TODO: We gonna remove this hook from this library because this is a client specific feature.
 * Creating map config through floors data.
 */
const useMapConfig = (defaultValues: {
  mapId: string
  areaId: string
}): types.MapConfig => {
  const floors = useFloors()
  const mapList = floors.map(floor => ({
    id: floor.id,
    title: floor.label,
    areaSelection: floor.areasByFloor,
  }))
  return {
    list: mapList,
    defaultValues,
  }
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
  useAllAreas,
  useAllCategoriesObj,
  useMapConfig,
}
