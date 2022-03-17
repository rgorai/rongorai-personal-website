const isValidString = (data: { [key: string]: any }) => {
  for (const k in data)
    if (
      typeof data[k] !== 'string' ||
      data[k].length === 0 ||
      data[k].trim().length === 0
    )
      throw `Please enter a ${k}`
}

export { isValidString }
