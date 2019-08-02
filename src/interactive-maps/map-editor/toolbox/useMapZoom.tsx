import React from 'react'

// useState => setter()
// SetState... => inputTypeSetter

// No need to add this as local state of useMapZoom hook because
// mapScaleTransformStyle is already enough.
let scale = 1

const useMapZoom = (setViewBox: React.StateSetter<DOMRect>) => {
  const [mapScaleTransformStyle, setMapScaleTransformStyle] = React.useState('')
  return React.useMemo(() => {
    const handleZoomIn = () => {
      setViewBox(currentViewBox => ({
        ...currentViewBox,
        width: currentViewBox.width - currentViewBox.width * 0.1,
        height: currentViewBox.height - currentViewBox.height * 0.1,
      }))
    }
    const handleZoomOut = () => {
      setViewBox(currentViewBox => ({
        ...currentViewBox,
        width: currentViewBox.width + currentViewBox.width * 0.1,
        height: currentViewBox.height + currentViewBox.height * 0.1,
      }))
    }
    const handleZoomingInMouseWheel: React.WheelEventHandler = event => {
      scale += event.deltaY * -0.01
      // Restrict scale
      scale = Math.min(Math.max(0.125, scale), 4)
      setMapScaleTransformStyle(`scale(${scale})`)
    }
    return {
      zoomIn: handleZoomIn,
      zoomOut: handleZoomOut,
      onWheel: handleZoomingInMouseWheel,
      transform: mapScaleTransformStyle,
    }
  }, [mapScaleTransformStyle, setViewBox])
}

export default useMapZoom
