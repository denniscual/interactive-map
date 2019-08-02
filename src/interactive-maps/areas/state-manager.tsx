import React, { createContext, useContext } from 'react';
import * as types from '../types';

const AreasContext = createContext<types.Areas>([]);
const AreasProvider: React.FC<{ value: types.Areas }> = ({ value, children }) => {
  return <AreasContext.Provider value={value}>{children}</AreasContext.Provider>;
};

const useAreas = () => useContext(AreasContext);

const useAreasToObj = () => {
  const floors = useAreas();
  return floors.reduce(
    (obj, value) => ({
      ...obj,
      [value.value.id]: value,
    }),
    {} as types.AreasObj,
  );
};

const useFindAreaByID = (id: string) => {
  const mapAreas = useAreas();
  return mapAreas.find((area) => area.value.areaID === id);
};

export { AreasContext, AreasProvider, useAreas, useAreasToObj, useFindAreaByID };
