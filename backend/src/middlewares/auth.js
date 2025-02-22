const basicAuth = require('basic-auth')
const { AuthenticationError } = require('../utils/errors')
const config = require('../config/config')

const auth = (req, res, next) => {
  const user = basicAuth(req)

  if (!user || !user.name || !user.pass) {
    throw new AuthenticationError('Authentication required')
  }

  if (user.name === config.auth.username && user.pass === config.auth.password) {
    return next()
  }

  throw new AuthenticationError('Invalid credentials')
}

module.exports = auth
