const { Op } = require('sequelize')
const Media = require('../models/Media')
const { ValidationError } = require('../utils/errors')

class MediaController {
  static async getMedia(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 12
      const { type, search } = req.query

      if (page < 1) throw new ValidationError('Page must be greater than 0')
      if (limit < 1) throw new ValidationError('Limit must be greater than 0')

      const where = {}
      if (type) {
        if (!['image', 'video'].includes(type)) {
          throw new ValidationError('Invalid media type')
        }
        where.type = type
      }
      
      if (search) {
        where[Op.or] = [
          { url: { [Op.iLike]: `%${search}%` } },
          { sourceUrl: { [Op.iLike]: `%${search}%` } }
        ]
      }

      const { count, rows } = await Media.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'url', 'sourceUrl', 'type', 'status', 'createdAt']
      })

      res.json({
        data: rows,
        pagination: {
          total: count,
          page,
          totalPages: Math.ceil(count / limit),
          hasMore: page * limit < count
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MediaController
