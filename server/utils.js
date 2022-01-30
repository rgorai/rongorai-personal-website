const getFile = (path) => `/api/files/${encodeURIComponent(path)}`

export { getFile }
