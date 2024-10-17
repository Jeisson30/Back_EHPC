import { pool } from "../../db.js"
import bycrypt from 'bcrypt'
import config from "../../config/config.js" 

export const changePassword = async ( req, res ) => {

  const { id } = req.user
  const { oldPassword, newPassword, confirmPassword } = req.body

  if (newPassword != confirmPassword) {       
      return res.status(400).json({ message : 'Las contraseñas no coinciden' })
  }

  try {

    const [user] = await pool.query('SELECT * FROM  users WHERE id = ?', [id])
    if (user.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const actualPassword = await bycrypt.compare(oldPassword, user[0].password)
    if (!actualPassword) {
      return  res.status(401).json({ message: 'Contraseña actual incorrecta' })
    }

    const comparePasswords = await bycrypt.compare(newPassword, user[0].password)
    if (comparePasswords) {
      return res.status(400).json({ message : 'La nueva contraseña no puede ser igual a la actual.' })
    }

    const crypPassword = await bycrypt.hash(newPassword , config.saltRounds)

    await pool.query('UPDATE  users SET password = ? WHERE id = ?', [crypPassword, id])
    res.status(200).json({ message: 'Contraseña actualizada con éxito' })
    
  } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ message: 'Error al cambiar la contraseña, intente mas tarde' })
  }
}