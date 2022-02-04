const parseRoute = (...pathItems: Array<string>) =>
  pathItems.reduce((p, c) => p + '/' + c.replace(' ', '-')?.toLowerCase(), '')

const getFile = (path: string) => `/api/files/${encodeURIComponent(path)}`

export { parseRoute, getFile }
