import React from 'react';
import * as types from '../types';

const initData: types.InteractiveMaps = [];

const InteractiveMapsContext = React.createContext<types.InteractiveMaps>(initData);
const InteractiveMapsDispatchContext = React.createContext<types.InteractiveMapsDispatch>(
  () => {},
);

const InteractiveMapsProvider: React.FC = ({ children }) => {
  const [interactiveMaps, dispatch] = React.useState(initData);
  return (
    <InteractiveMapsContext.Provider value={interactiveMaps}>
      <InteractiveMapsDispatchContext.Provider value={dispatch}>
        {children}
      </InteractiveMapsDispatchContext.Provider>
    </InteractiveMapsContext.Provider>
  );
};

const useInteractiveMaps = () => React.useContext(InteractiveMapsContext);
const useInteractiveMapsDispatch = () => React.useContext(InteractiveMapsDispatchContext);

export { InteractiveMapsProvider, useInteractiveMaps, useInteractiveMapsDispatch };
