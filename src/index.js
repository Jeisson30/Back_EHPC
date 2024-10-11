import express from 'express'
import dotenv from 'dotenv'
import authRouter from '../src/routes/auth.routes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.listen(3000)

console.log('//====== Inicia Servidor ======\\')

//Rutas

app.use('/api/auth', authRouter)

