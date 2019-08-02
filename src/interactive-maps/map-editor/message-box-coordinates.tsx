import React from 'react'
import * as types from '../types'

const MessageBoxCoordinatesContext = React.createContext<
  types.MessageBoxCoordinates
>({
  x: 0,
  y: 0,
})

const MessageBoxCoordinatesDispatchContext = React.createContext<
  types.MessageBoxCoordinatesDispatch
>(() => {})

const MessageBoxCoordinatesProvider: React.FC = ({ children }) => {
  const [messageBoxCoordinates, setMessageBoxCoordinates] = React.useState({
    x: 0,
    y: 0,
  })
  return (
    <MessageBoxCoordinatesContext.Provider value={messageBoxCoordinates}>
      <MessageBoxCoordinatesDispatchContext.Provider
        value={setMessageBoxCoordinates}
      >
        {children}
      </MessageBoxCoordinatesDispatchContext.Provider>
    </MessageBoxCoordinatesContext.Provider>
  )
}

const useMessageBoxCoordinates = () =>
  React.useContext(MessageBoxCoordinatesContext)
const useMessageBoxCoordinatesDispatch = () =>
  React.useContext(MessageBoxCoordinatesDispatchContext)

// TODO: Enhance the typing for this HOC
const withMessageBoxCoordinates = (WrappedComponent: any) => {
  const WithMessageBoxCoordinates: (props: any) => JSX.Element = props => {
    const coordinates = useMessageBoxCoordinates()
    return <WrappedComponent {...props} coordinates={coordinates} />
  }
  return WithMessageBoxCoordinates
}

export {
  MessageBoxCoordinatesProvider,
  useMessageBoxCoordinates,
  useMessageBoxCoordinatesDispatch,
  withMessageBoxCoordinates,
}
