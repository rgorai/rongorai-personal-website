const parseRoute = (...pathItems: Array<string>) =>
  pathItems.reduce((p, c) => p + '/' + c.replaceAll(' ', '-').toLowerCase(), '')

const getFile = (path: string) => `/api/files/${encodeURIComponent(path)}`

const parseId = (text: string) => text.replaceAll(' ', '-').toLowerCase()

export { parseRoute, getFile, parseId }
