import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Motion, spring } from 'react-motion';
import * as floors from '../floors';
import { useAppSelector, appUtils } from '../app-state-manager';
import { useInteractiveMaps } from '../maps';

const Body = styled.div`
  padding: 0 64px;
  position: relative;
  height: 66vh;
  margin: 48px 0px 128px 0px;
  display: flex;
  flex-direction: column;
`;

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const getMapClassName = (offset: number) => css`
  position: absolute;
  width: 100%;
  height: 130%;
  pointer-events: none;
  opacity: ${1 - Math.abs(offset)};
  transform: ${[`translateY(${offset * 25}%)`, `rotateX(${30 - offset * 5}deg)`].join(
    ' ',
  )};
`;

const Maps = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  position: absolute;
  top: 0;
  left: 9%;
  width: 100%;
  height: 100%;
`;

const AreaAndMapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: stretch;
  perspective: 1200px;
  margin-top: 1em;
  position: relative;
`;

const BasicMaps: React.FC<{
  areaControls: JSX.Element;
  floorControls: JSX.Element;
  mapClassName?: string;
  bodyClassName?: string;
}> = ({ areaControls, floorControls, mapClassName = '', bodyClassName = '' }) => {
  // For getting the `d` attribute value of the floor-outer-boarder path.
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const [dAttribute, setDAttribute] = React.useState('');
  React.useEffect(() => {
    if (divRef.current) {
      const pathOuterBoarder = divRef.current.querySelector(
        // NOTE: This path with this ID is very essential. Every map should have this. It holds the floor outer boarder.
        '#floor-outer-border',
      );
      if (pathOuterBoarder) {
        const d = pathOuterBoarder.getAttribute('d');
        if (d) {
          setDAttribute(d);
        }
      }
    }
  }, []);

  const mapFloors = floors.stateManager.useFloors();
  const activeFloorID = useAppSelector(appUtils.getActiveFloor);
  const maps = useInteractiveMaps();
  const activeFloorIndex = mapFloors.findIndex(
    (mapFloor) => mapFloor.id === activeFloorID,
  );

  return (
    <Motion
      defaultStyle={{ index: activeFloorIndex }}
      style={{ index: spring(activeFloorIndex) }}
    >
      {(interpolatingStyle) => (
        <Body className={bodyClassName}>
          {floorControls}
          <AreaAndMapContainer>
            {areaControls}
            <Maps>
              {maps.map((map, idx) => (
                <div
                  ref={divRef}
                  key={map.id}
                  css={getMapClassName(idx - interpolatingStyle.index)}
                  className={mapClassName}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 4000 3000"
                    style={{ transform: 'translateY(8px) scale(0.99)' }}
                  >
                    <path fill="hsl(204, 5%, 68%)" d={dAttribute} />
                  </Svg>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 4000 3000"
                    style={{ transform: 'translateY(5px) scale(0.996)' }}
                  >
                    <path fill="hsl(204, 5%, 68%)" d={dAttribute} />
                  </Svg>
                  {<map.Component />}
                </div>
              ))}
            </Maps>
          </AreaAndMapContainer>
        </Body>
      )}
    </Motion>
  );
};

export default BasicMaps;
