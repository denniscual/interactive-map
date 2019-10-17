import React from 'react'
import FileSaver from 'file-saver'
import SyntaxHighlighter from './SyntaxHighlighter'
import prettier from 'prettier/standalone'
import prettierTS from 'prettier/parser-typescript'
import Clipboard from 'clipboard'
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

const createExportedCodeWithValue = (value: string) => {
  const code = `
    export default ${value}
  `
  return formatCode(code)
}

/**
 * Merging the stringify codes.
 */
const mergeCodes = (...codes: string[]) => {
  return codes.reduce((acc, value) => acc.concat(value).concat('\n'), '')
}

const generatedCodesCSS = `
  margin-bottom: 4em;
  max-height: 1000px;
`

new Clipboard('#header-code-clipboard')

/**
 * TODO: We need to add the `copyCode` button outside the `code editor`.
 * So that we don't need to toggle the editor to get the codes.
 */
const GeneratedCodes: React.FC<{
  title: string
  mapCodes: string[]
}> = React.memo(({ title, mapCodes }) => {
  const [isCodeBlockVisible, setIsCodeBlockVisible] = React.useState(false)
  let codeBlock = <div />

  const codes = mergeCodes(...mapCodes)

  if (isCodeBlockVisible) {
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
      <button id="header-code-clipboard" data-clipboard-text={codes}>
        Copy code
      </button>
      <button onClick={handleMapDownload}>Download Codes</button>
      {codeBlock}
    </div>
  )
})

const filterStoreAreas: (
  storeAreas: types.StoreAreas,
  predicateFn: (area: types.StoreArea, idx?: number) => boolean
) => types.StoreAreas = (storeAreas: types.StoreAreas, predicateFn) =>
  Object.values(storeAreas)
    .filter(predicateFn)
    .reduce(
      (acc, value) => ({
        ...acc,
        [value.id]: value,
      }),
      {}
    )

const Nodes: React.FC<{
  mapNodeElements: types.MapNodeElement[]
  activeFloorID: string
  storeAreas: types.StoreAreas
}> = ({ mapNodeElements, activeFloorID, storeAreas }) => {
  const mapCodes = React.useMemo(() => {
    // ------- Code for store areas -------- //
    const filteredStoreAreas = filterStoreAreas(
      storeAreas,
      (area: types.StoreArea) => area.floorID === activeFloorID
    )

    const storeAreasCode = createCodeVariableWithValue(
      'storeAreas',
      JSON.stringify(filteredStoreAreas)
    )

    // ------- Code for nodes -------- //
    const newMapNodes = React.Children.toArray(mapNodeElements).map(
      nodeElement => {
        const { props } = nodeElement
        if (props['data-floor-id'] === activeFloorID) {
          const value: types.MapNodesProps = {
            id: props.id,
            cx: props.cx,
            cy: props.cy,
            'data-direct-nodes': props['data-direct-nodes'],
            'data-floor-id': props['data-floor-id'],
            'data-key-id': props['data-key-id'],
          }
          return value
        }
      }
    )

    const nodesCode = createCodeVariableWithValue(
      'nodes',
      JSON.stringify(newMapNodes)
    )

    return [storeAreasCode, nodesCode]
  }, [activeFloorID, mapNodeElements, storeAreas])

  return <GeneratedCodes title="Areas and Nodes" mapCodes={mapCodes} />
}

const Directions = () => {
  const mapNodesDirectionsArray = rootMapNodes.mapNodesDirectionsStateManager.useMapNodesDirectionsArray()
  const mapCodes = React.useMemo(() => {
    const directionsCode = createExportedCodeWithValue(
      JSON.stringify(mapNodesDirectionsArray)
    )
    return [directionsCode]
  }, [mapNodesDirectionsArray])
  return <GeneratedCodes title="Node Directions" mapCodes={mapCodes} />
}

const Portals: React.FC<{ storeAreas: types.StoreAreas }> = ({
  storeAreas,
}) => {
  const mapCodes = React.useMemo(() => {
    const filteredPortalAreas = filterStoreAreas(
      storeAreas,
      (area: types.StoreArea) => area.type === 'portal'
    )
    const portalCode = createExportedCodeWithValue(
      JSON.stringify(filteredPortalAreas)
    )
    return [portalCode]
  }, [storeAreas])
  return <GeneratedCodes title="Portal Areas" mapCodes={mapCodes} />
}

export { Nodes, Portals, Directions }
