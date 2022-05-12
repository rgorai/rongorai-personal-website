const getDocument = (path) => process.env.REACT_APP_AWS_DISTRIBUTION_URL + path

const Tag = (tag, text, props) => ({ tag, text, props })

const openLinkInNewTab = { target: '_blank', rel: 'noreferrer noopener' }

const Component = (component, props) => ({ component, props })

export { getDocument, Tag, openLinkInNewTab, Component }
