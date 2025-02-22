const sequelize = require('./database')
const Media = require('../models/Media')

async function initializeDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate()
    console.log('Database connection established successfully.')

    // Sync all models
    await sequelize.sync({ force: true })
    console.log('Database models synchronized successfully.')
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}

module.exports = initializeDatabase
