const isValidString = (data) => {
  for (const k in data)
    if (
      typeof data[k] !== 'string' ||
      data[k].length === 0 ||
      data[k].trim().length === 0
    )
      throw `Error: ${k} must be a non-empty string.`
}

export { isValidString }
