// @flow
import React from 'react'

// constants
const cX = 98
const cY = 128
const circleRadius = 32
const scale = 1
const offsetToCenterX = scale * cX
const offsetToCenterY = scale * cY

type MapMarkerProps = {
  x: number
  y: number
  angle: number
}

// TODO: This Component should be included to the interactive-maps library.
// This is included into pre-defined layout provided by the library.
const DeviceMarker: React.FC<{ x: number; y: number; angle: number }> = ({
  x,
  y,
}) => {
  return (
    <g id="marker">
      <defs>
        <filter
          id="filter0_d"
          width="200%"
          height="200%"
          filterUnits="userSpaceOnUse"
          colorInterpolation="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
      <g filter="url(#filter0_d)">
        <circle cx={x} cy={y} r="86" fill="white" fillOpacity="0.85" />
      </g>
      <circle cx={x} cy={y} r="44.5" fill="#3555FF" />
    </g>
  )
}

export default DeviceMarker
