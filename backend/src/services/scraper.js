const axios = require('axios')
const cheerio = require('cheerio')

class ScraperService {
  static async scrapeUrl(url) {
    try {
      // Validate URL format
      if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL provided')
      }

      const urlRegex = /^(http|https):\/\/[^ "]+$/
      if (!url.match(urlRegex)) {
        throw new Error('Invalid URL format')
      }

      const response = await axios.get(url)

      const $ = cheerio.load(response.data)

      const media = {
        images: [],
        videos: [],
      }

      // Scrape images
      $('img').each((i, element) => {
        let src = $(element).attr('src')

        if (!src || src.startsWith('data:')) {
          src = null
        }

        // Also check data-src for lazy loaded images
        if (!src) {
          src = $(element).attr('data-src')
        }

        // Handle relative URLs
        if (src && !src.match(/^(http|https):\/\//)) {
          try {
            const baseUrl = new URL(url)
            src = new URL(src, baseUrl).href
          } catch (e) {
            return // Skip invalid URLs
          }
        }
        if (src) {
          media.images.push({
            url: src,
            sourceUrl: url,
            type: 'image',
            status: 'completed',
          })
        }
      })

      // Scrape videos
      $('video, video source, iframe[src*="youtube"], iframe[src*="vimeo"]').each((i, element) => {
        let src = $(element).attr('src')

        if (!src || src.startsWith('data:')) {
          src = null
        }

        // Check for data-src
        if (!src) {
          src = $(element).attr('data-src')
        }
 
        // Handle relative URLs
        if (src && !src.match(/^(http|https):\/\//)) {
          try {
            const baseUrl = new URL(url)
            src = new URL(src, baseUrl).href
          } catch (e) {
            return // Skip invalid URLs
          }
        }
        if (src) {
          media.videos.push({
            url: src,
            sourceUrl: url,
            type: 'video',
            status: 'completed',
          })
        }
      })

      return media
    } catch (error) {
      console.error(`Error scraping ${url}:`, error)
      if (error.response) {
        throw new Error(`HTTP error ${error.response.status}: ${error.response.statusText}`)
      } else if (error.request) {
        throw new Error('Network error: No response received')
      }
      throw error
    }
  }
}

module.exports = ScraperService
