const Bull = require('bull')
const Media = require('../models/Media')
const ScraperService = require('./scraper')

const scrapeQueue = new Bull('scrape-queue', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  limiter: {
    max: 100, // Process max 100 jobs per
    duration: 1000, // per second
  },
})

scrapeQueue.process(async (job) => {
  const { url } = job.data

  try {
    const mediaItems = await ScraperService.scrapeUrl(url)

    // Batch insert all found media items
    if (mediaItems.images.length > 0 || mediaItems.videos.length > 0) {
      await Media.bulkCreate([...mediaItems.images, ...mediaItems.videos])
    }

    return {
      success: true,
      url,
      count: mediaItems.images.length + mediaItems.videos.length,
    }
  } catch (error) {
    throw error
  }
})

// Handle failed jobs
scrapeQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed for URL ${job.data.url}:`, error)
})

scrapeQueue.on('completed', async (job) => {
  await job.remove()
})

module.exports = scrapeQueue
