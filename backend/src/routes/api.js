const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const ScrapeController = require('../controllers/scrape.controller')
const MediaController = require('../controllers/media.controller')

// Protected routes
router.use(auth)

// Scraping endpoints
router.post('/scrape', ScrapeController.scrapeUrls)

// Media endpoints
router.get('/media', MediaController.getMedia)

module.exports = router
