const parseRoute = (arr: Array<string | undefined>) =>
  arr.reduce(
    (p, c) => p + (c ? '/' + c.replace(' ', '-')?.toLowerCase() : ''),
    ''
  ) as string

const getFile = (path: string) =>
  `/api/files/${encodeURIComponent(path)}`

export { parseRoute, getFile }
