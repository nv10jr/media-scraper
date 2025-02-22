const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    index: true
  },
  sourceUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    index: true
  },
  type: {
    type: DataTypes.ENUM('image', 'video'),
    allowNull: true,
    index: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    defaultValue: 'pending',
    index: true
  },
}, {
  indexes: [
    // Composite index for common query patterns
    {
      name: 'media_type_status_idx',
      fields: ['type', 'status']
    },
    // Index for createdAt to optimize sorting
    {
      name: 'media_created_at_idx',
      fields: ['createdAt']
    }
  ]
})

module.exports = Media
