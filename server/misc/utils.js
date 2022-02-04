const getFile = (path) => `/api/files/${encodeURIComponent(path)}`

const Tag = (tag, text, props) => ({ tag, text, props })

const Component = (component, props) => ({ component, props })

export { getFile, Tag, Component }
