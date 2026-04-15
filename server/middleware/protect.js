const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  const h = req.headers.authorization
  let token = null
  if (h && h.startsWith('Bearer ')) {
    token = h.split(' ')[1]
  }
  if (!token) {
    return res.status(401).json({ message: 'need token' })
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = data.userId
    next()
  } catch (e) {
    return res.status(401).json({ message: 'token no good' })
  }
}

module.exports = protect
