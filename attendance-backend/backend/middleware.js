const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log("Auth Header:", authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid"
    })
  }

  const token = authHeader.split(" ")[1] // remove 'Bearer'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    req.role = decoded.role
    next()
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, token invalid"
    })
  }
}

module.exports = { authMiddleware }
