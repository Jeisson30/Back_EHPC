import { Router } from "express"
import { changePassword } from "../../controllers/auth/changePassUser.controller.js"
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = Router()

router.post('/changePassword', verifyToken, changePassword)

export default router