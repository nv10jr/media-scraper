const scrapeQueue = require('../services/queue')
const Media = require('../models/Media')

class ScrapeController {
  static async scrapeUrls(req, res, next) {
    try {
      const { urls } = req.body

      if (!Array.isArray(urls)) {
        return res.status(400).json({ error: 'URLs must be provided as an array' })
      }

      // Add each URL to the queue
      const jobs = urls.map((url) => scrapeQueue.add({ url }))
      await Promise.all(jobs)

      res.json({
        message: `Added ${urls.length} URLs to scraping queue`,
        status: 'pending',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ScrapeController
