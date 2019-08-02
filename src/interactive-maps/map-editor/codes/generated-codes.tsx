import React from 'react'
import FileSaver from 'file-saver'
import SyntaxHighlighter from './SyntaxHighlighter'
import reactElementToJSXString from 'react-element-to-jsx-string'
import prettier from 'prettier/standalone'
import prettierTS from 'prettier/parser-typescript'
import * as rootMapNodes from '../../map-nodes'
import * as types from '../../types'

/**
 * Reference: https://prettier.io/docs/en/api.html
 */
const formatCode = (code: string) => {
  return prettier.format(code, {
    parser: 'typescript',
    plugins: [prettierTS],
    trailingComma: 'all',
    semi: false,
    singleQuote: true,
  })
}

/**
 * Create a code string with assign to given variable name. The
 * code is also formatted using prettierjs.
 */
const createCodeVariableWithValue = (variableName: string, value: string) => {
  const code = `
    export const ${variableName} = ${value}
  `
  return formatCode(code)
}

/**
 * Merging the stringify codes.
 */
const mergeCodes = (...codes: string[]) => {
  return codes.reduce((acc, value) => acc.concat(value).concat('\n'), '')
}

const groupAreasByType = (
  mapNodes: types.MapNodesProps[],
  areaType: types.AreaTypes
) => {
  return mapNodes
    .filter(node => node['data-area-type'] === areaType)
    .map(node => ({
      id: node.id,
      label: node['data-label'],
      areaID: node['data-area-id'],
      // only add floorID property if the `areaType` is store.
      floorID:
        node['data-area-type'] === 'store' ? node['data-floor-id'] : undefined,
    }))
    .reduce(
      (acc, value) => ({
        ...acc,
        [value.id]: value,
      }),
      {}
    ) as types.CollectionOfEntity
}

const generatedCodesCSS = `
  margin-bottom: 4em;
  max-height: 1000px;
`

const GeneratedCodes: React.FC<{
  title: string
  mapCodes: string[]
}> = React.memo(({ title, mapCodes }) => {
  const [isCodeBlockVisible, setIsCodeBlockVisible] = React.useState(false)
  let codeBlock = <div />

  if (isCodeBlockVisible) {
    // compose codes
    const codes = mergeCodes(...mapCodes)
    codeBlock = (
      <SyntaxHighlighter language="javascript">{codes}</SyntaxHighlighter>
    )
  } else {
    codeBlock = <div />
  }

  // We are using FileSaver.js to save content to a file and download it
  // using only browser (without server.)
  // Reference: https://github.com/eligrey/FileSaver.js
  const handleMapDownload: React.MouseEventHandler = React.useCallback(
    e => {
      const date = new Date()
      var file = new File(mapCodes, `map-${date.toLocaleString()}`, {
        type: 'text/plain;charset=utf-8',
      })
      FileSaver.saveAs(file)
    },
    [mapCodes]
  )

  return (
    <div css={generatedCodesCSS}>
      <header>
        <h2>{title}</h2>
      </header>
      <button onClick={() => setIsCodeBlockVisible(toggle => !toggle)}>
        Toggle Codes
      </button>
      <button onClick={handleMapDownload}>Download Codes</button>
      {codeBlock}
    </div>
  )
})

const Nodes: React.FC<{
  mapNodeElements: types.MapNodeElement[]
  activeFloorID: string
}> = ({ mapNodeElements, activeFloorID }) => {
  const mapNodesByID = rootMapNodes.mapNodesStateManager.useGetMapNodesByKey(
    'data-floor-id',
    activeFloorID
  )
  const mapNodesWhichArePortal = rootMapNodes.mapNodesStateManager.useGetMapNodesByKey(
    'data-area-type',
    'portal'
  )

  const mapCodes = React.useMemo(() => {
    const importingReactModuleCode = `import React from 'react'`

    // ------- Code for stores -------- //
    const stores = groupAreasByType(mapNodesByID, 'store')
    const storesCode = createCodeVariableWithValue(
      'stores',
      JSON.stringify(stores)
    )

    // ------- Code for portals -------- //
    const portals = groupAreasByType(mapNodesWhichArePortal, 'portal')
    const portalsCode = createCodeVariableWithValue(
      'portals',
      JSON.stringify(portals)
    )

    // ------- Code for nodes -------- //
    const newMapNodeElements = React.Children.map(
      mapNodeElements,
      nodeElement => {
        const { props } = nodeElement
        const { id, fill, r, cx, cy } = props
        if (props['data-floor-id'] === activeFloorID) {
          return (
            <circle
              id={id}
              fill={fill}
              r={r}
              cx={cx}
              cy={cy}
              data-key-id={props['data-key-id']}
              data-label={props['data-label']}
              data-direct-nodes={props['data-direct-nodes']}
              data-area-type={props['data-area-type']}
              data-area-id={props['data-area-id']}
              data-floor-id={props['data-floor-id']}
            />
          )
        }
      }
    )
    const stringifyElements: string = reactElementToJSXString(
      <g id="nodes">{newMapNodeElements}</g>
    )
    const nodesCode = createCodeVariableWithValue('nodes', stringifyElements)

    return [importingReactModuleCode, storesCode, portalsCode, nodesCode]
  }, [activeFloorID, mapNodeElements, mapNodesByID, mapNodesWhichArePortal])

  return <GeneratedCodes title="Nodes" mapCodes={mapCodes} />
}

const Directions = () => {
  const mapNodesDirectionsArray = rootMapNodes.mapNodesDirectionsStateManager.useMapNodesDirectionsArray()
  const mapCodes = React.useMemo(() => {
    // ------- Code for directions -------- //
    const directionsCode = createCodeVariableWithValue(
      'directions',
      JSON.stringify(mapNodesDirectionsArray)
    )
    return [directionsCode]
  }, [mapNodesDirectionsArray])
  return <GeneratedCodes title="Node Directions" mapCodes={mapCodes} />
}

export { Nodes, Directions }
