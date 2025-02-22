require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const apiRoutes = require('./routes/api')
const errorHandler = require('./middlewares/errorHandler')
const sequelize = require('./config/database')

const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api', apiRoutes)

// Error handling
app.use(errorHandler)

// Database connection and server start
const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Database connected successfully')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error)
    process.exit(1)
  }
}

startServer()
