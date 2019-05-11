const jwt = require('jsonwebtoken')
const { jwtPrivateKey } = require('../config')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send('Access denied. no token provided.')

  try {
    const decoded = jwt.verify(token, jwtPrivateKey)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(400).send('Invalid token.')
  }
}
