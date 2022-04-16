const getFile = (path) => `/api/files/${encodeURIComponent(path)}`

const Tag = (tag, text, props) => ({ tag, text, props })

const openLinkInNewTab = { target: '_blank', rel: 'noreferrer noopener' }

const Component = (component, props) => ({ component, props })

export { getFile, Tag, openLinkInNewTab, Component }
