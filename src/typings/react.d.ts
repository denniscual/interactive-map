import 'module'

// Declaration merging
declare module 'react' {
  // Add support for css prop
  interface DOMAttributes<T> {
    css?: any
  }

  /**
   * A function type which is compatible for React.useState setter.
   * It accepts an input of state of type 'S' or an updater<S> type.
   */
  export type StateSetter<S> = React.Dispatch<React.SetStateAction<S>>

  /**
   * This is a mock type for native Map class.
   */
  export type NativeMap<K, V> = Map<K, V>
}
