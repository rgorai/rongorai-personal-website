const parseRoute = (...pathItems: Array<string>) =>
  pathItems.reduce((p, c) => p + '/' + c.replace(' ', '-').toLowerCase(), '')

const getFile = (path: string) => `/api/files/${encodeURIComponent(path)}`

const parseId = (text: string) => text.replace(' ', '-').toLowerCase()

export { parseRoute, getFile, parseId }
