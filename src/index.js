import express from 'express'
import dotenv from 'dotenv'
import authRouterRegister from './routes/auth/registerUser.routes.js'
import authRouterLogin from './routes/auth/loginUser.routes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.listen(3000)

console.log('//====== Inicia Servidor ======\\')

//Rutas

app.use('/api/auth', authRouterRegister)
app.use('/api/auth', authRouterLogin)

