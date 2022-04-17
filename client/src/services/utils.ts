const parseRoute = (...pathItems: Array<string>) =>
  pathItems.reduce((p, c) => p + '/' + c.replaceAll(' ', '-').toLowerCase(), '')

const parseFilename = (...pathItems: Array<string>) =>
  pathItems.map((e) => e.replaceAll(' ', '-').toLowerCase()).join('-')

const getFile = (path: string) => `/api/files/${encodeURIComponent(path)}`

const parseId = (text: string) => text.replaceAll(' ', '-').toLowerCase()

export { parseRoute, parseFilename, getFile, parseId }
