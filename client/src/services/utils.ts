const parseRoute = (...pathItems: Array<string>): string =>
  pathItems.reduce(
    (p, c) => p + (c !== '' ? '/' + c.replaceAll(' ', '-').toLowerCase() : ''),
    ''
  )

const parseFilename = (...pathItems: Array<string>) =>
  pathItems.map((e) => e.replaceAll(' ', '-').toLowerCase()).join('-')

const getMedia = (path: string, compressed?: boolean) => {
  const [filename, ext] = path.split('.')
  const newPath =
    compressed && ext !== 'gif' ? `/_compressed${filename}.webp` : path

  return process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_AWS_DISTRIBUTION_URL + newPath
    : `http://${window.location.host.split(':')[0]}:${
        process.env.PORT ?? 5000 + 1
      }/api/localS3/${encodeURIComponent(newPath)}`
}

const parseId = (text: string) => text.replaceAll(' ', '-').toLowerCase()

export { parseRoute, parseFilename, getMedia, parseId }
