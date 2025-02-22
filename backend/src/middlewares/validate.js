const validateUrls = (req, res, next) => {
  const { urls } = req.body

  if (!Array.isArray(urls)) {
    return res.status(400).json({
      error: 'URLs must be provided as an array',
    })
  }

  if (urls.length === 0) {
    return res.status(400).json({
      error: 'At least one URL must be provided',
    })
  }

  // Basic URL validation
  const invalidUrls = urls.filter((url) => {
    try {
      new URL(url)
      return false
    } catch {
      return true
    }
  })

  if (invalidUrls.length > 0) {
    return res.status(400).json({
      error: 'Invalid URLs detected',
      invalidUrls,
    })
  }

  next()
}

module.exports = {
  validateUrls,
}
