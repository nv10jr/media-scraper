const sequelize = require('./database')
const Media = require('../models/Media')

async function initializeDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate()
    console.log('Database connection established successfully.')

    // Drop existing tables and recreate with new schema
    await sequelize.sync({ force: true })
    
    // Create indexes
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_media_url ON "Media" (url);
      CREATE INDEX IF NOT EXISTS idx_media_source_url ON "Media" (source_url);
      CREATE INDEX IF NOT EXISTS idx_media_type ON "Media" (type);
      CREATE INDEX IF NOT EXISTS idx_media_status ON "Media" (status);
      CREATE INDEX IF NOT EXISTS idx_media_type_status ON "Media" (type, status);
      CREATE INDEX IF NOT EXISTS idx_media_created_at ON "Media" ("createdAt");
    `)
    
    console.log('Database models and indexes synchronized successfully.')
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}

module.exports = initializeDatabase
