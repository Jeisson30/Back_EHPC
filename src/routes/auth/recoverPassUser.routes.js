import { Router } from "express"
import { recoverPassword } from "../../controllers/auth/recoverPassUser.controller.js";

const router = Router()

router.post('/recoverPassword', recoverPassword)

export default router