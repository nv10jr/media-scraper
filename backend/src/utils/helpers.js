const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}

const sanitizeUrl = (url) => {
  try {
    const parsed = new URL(url)
    return parsed.toString()
  } catch (err) {
    return null
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const chunkArray = (array, size) => {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

module.exports = {
  isValidUrl,
  sanitizeUrl,
  sleep,
  chunkArray,
}
