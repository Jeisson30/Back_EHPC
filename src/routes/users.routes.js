import { Router } from "express";
import { registerUsers } from "../controllers/users.controller.js";

const router = Router()

router.post('createUser', registerUsers)