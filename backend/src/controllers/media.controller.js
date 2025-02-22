const { Op } = require('sequelize')
const Media = require('../models/Media')

class MediaController {
  static async getMedia(req, res, next) {
    try {
      const { page = 1, limit = 12, type, search } = req.query
      const offset = (page - 1) * limit

      const where = {}
      if (type) {
        where.type = type
      }
      if (search) {
        where.url = {
          [Op.like]: `%${search}%`,
        }
      }

      const { count, rows } = await Media.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']],
      })

      res.json({
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          totalPages: Math.ceil(count / limit),
        },
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MediaController
