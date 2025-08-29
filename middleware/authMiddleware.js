import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized, login again' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // find company by ID (without password)
    req.company = await Company.findById(decoded.id).select('-password')

    if (!req.company) {
      return res.status(401).json({ success: false, message: 'Company not found' })
    }

    // ✅ important: pass control to next middleware/route
    next()

  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not Authenticated', error: error.message })
  }
}
