import { pool } from "../../db.js"
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../../config/config.js";

export const loginUsers = async ( req, res ) => {

  const { email, password } = req.body;

  try {

    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

    if (user.length == 0) {
      return res.status(404).json({ message: 'Credenciales incorrectas' })
    }

    const matchPassword = await bycript.compare(password, user[0].password)

    if (!matchPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const token = jwt.sign({
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        family_id: user[0].family_id
      },
        config.jwtSecret,
      { expiresIn : config.jwtExpiresIn }
    )

    res.status(200).json({ message: 'Login Exitoso', token })

  } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ message: 'Error de red o servidor, por favor intente mas tarde' })
  }
}
