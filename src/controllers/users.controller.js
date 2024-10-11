import { pool } from "../db.js"
import bcrypt from 'bcrypt'
//import jwt from 'jsonwebtoken'
import config from "../config/config.js"

export const registerUsers = async (req, res) => {

  const  { name, cc_document, email, phone, password } = req.body

  try {
    const [user] = await pool.query('SELECT * FROM users where cc_document = ? OR email = ?',
      [cc_document, email]
    )
    if (user.length > 0) {
      return res.status(400).json({ message: 'Correo o documento ya existentes en el sistema' })
    }

    const cryptPassword = await bcrypt.hash(password, config.saltRounds)

    await pool.query('INSERT INTO users (name, cc_document, email, phone, password) VALUES (?,?,?,?,?)',
      [name, cc_document, email, phone, cryptPassword]
    )

    res.status(200).json({ message: 'Usuario registrado exitosamente' })
      
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ message: 'Error registrando al usuario' })    
  }
}