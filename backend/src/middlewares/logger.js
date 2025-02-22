const morgan = require('morgan')

// Custom token for request body logging
morgan.token('body', (req) => JSON.stringify(req.body))

// Custom format string
const logFormat = ':method :url :status :response-time ms - :body'

// Create logger middleware
const logger = morgan(logFormat, {
  skip: (req, res) => process.env.NODE_ENV === 'test',
})

module.exports = logger
