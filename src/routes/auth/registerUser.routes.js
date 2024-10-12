import { Router } from "express"
import { registerUsers } from "../../controllers/auth/registerUser.controller.js"

const router = Router()

router.post('/register',registerUsers)

export default router