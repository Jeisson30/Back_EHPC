import { pool } from "../../db.js"
import jwt from 'jsonwebtoken'
import config from "../../config/config.js"
import nodemailer from 'nodemailer'

export const recoverPassword = async ( req, res ) => {

  const { email } = req.body

  try {
      
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

    if (user.length === 0) {
      return res.status(400).json({ message: '!Correo no encontrado¡' })
    }

    const token = jwt.sign({
        id: user[0].id
      },
      config.jwtSecret,
      { expiresIn : config.jwtExpiresIn }
    )

    const sendMail = nodemailer.createTransport({
      service : 'Gmail',
      auth : {
        user : process.env.EMAIL,
        pass : process.env.EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from : 'noreply@ehpc.com',
      to : email,
      subject : 'Recuperación de contraseña',
      text : `Para reestablecer su contraseña, haz click en el siguiente enlace http://localhost:3000/changePassword?token=${token}` 
    }

    await sendMail.sendMail(mailOptions)

    res.status(200).json({ message : 'Enlace de recuperación enviado a tu correo' })

  } catch (error) {
      console.error('Error: ', error)
      res.status(500).json({ message: 'Error al enviar el enlace de recuperación'})
  }

}