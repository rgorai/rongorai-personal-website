export const isValidString = (data: Record<string, unknown>): void => {
  for (const k in data)
    if (
      typeof data[k] !== 'string' ||
      (data[k] as string).length === 0 ||
      (data[k] as string).trim().length === 0
    )
      throw `Error: ${k} must be a non-empty string. Received: ${data[k]}`
}
