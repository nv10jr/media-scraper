const basicAuth = require('basic-auth')

const auth = (req, res, next) => {
  const user = basicAuth(req)

  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    return res.status(401).send('Authentication required')
  }

  if (user.name === process.env.AUTH_USERNAME && user.pass === process.env.AUTH_PASSWORD) {
    return next()
  }

  return res.status(401).send('Invalid credentials')
}

module.exports = auth
