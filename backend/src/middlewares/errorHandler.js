const { AppError } = require('../utils/errors')

const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status
      }
    })
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: {
        message: 'Validation error',
        details: err.errors.map(e => e.message),
        status: 400
      }
    })
  }

  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      status: 500
    }
  })
}

module.exports = errorHandler
