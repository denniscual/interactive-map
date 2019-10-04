import React from 'react'
import { css } from 'emotion'

const toolboxItemCSS = css`
  h4 {
    margin-bottom: 1.2em;
  }
`
const ToolboxItem: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
  children,
}) => {
  return (
    <section className={toolboxItemCSS}>
      <h4>{title}</h4>
      {children}
      <p>{description}</p>
      <hr />
    </section>
  )
}
ToolboxItem.defaultProps = {
  description: '',
}

export default ToolboxItem
