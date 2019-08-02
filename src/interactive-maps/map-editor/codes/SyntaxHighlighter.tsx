import React from 'react'
import Clipboard from 'clipboard'
import Prism from 'prismjs'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import './syntax-highlighter.css'
import 'styled-components/macro'

type Languages = 'javascript' | 'css'

// Reference - https://prismjs.com/plugins/normalize-whitespace/
Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'break-lines': 80,
  'remove-initial-line-feed': false,
})
// Add copy-to-clipboard functionality
new Clipboard('#btn-clipboard')

const syntaxHighlighterCSS = `
  position: relative;
  overflow: scroll;
  max-height: 1000px;

  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`

const SyntaxHighlighter: React.FC<{
  language: Languages
  children: string
}> = React.memo(({ language, children: code }) => {
  // Highlight code block
  React.useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <div css={syntaxHighlighterCSS}>
      <button id="btn-clipboard" data-clipboard-text={code}>
        Copy code
      </button>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
})

export default SyntaxHighlighter
