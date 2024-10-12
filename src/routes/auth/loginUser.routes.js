import { Router } from "express"
import { loginUsers } from "../../controllers/auth/loginUser.controller.js"

const router = Router()

router.post('/login', loginUsers)

export default router