import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const verifyToken = (req, res, next) => {

  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'No se proporciono token' })
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'No autorizado' })
    }
    console.log('Decoded JWT:', decoded); 
    req.user = decoded
    next()
  })
}