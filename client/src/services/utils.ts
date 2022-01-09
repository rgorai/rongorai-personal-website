const getRoute = (arr: Array<string | undefined>) =>
  arr.reduce(
    (p, c) => p + (c ? '/' + c.replace(' ', '-')?.toLowerCase() : ''),
    ''
  ) as string

export { getRoute }
