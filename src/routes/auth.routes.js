import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import {autRequired} from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.sqchema.js";

const router = Router();

router.post('/register',validateSchema(registerSchema) ,register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

router.get('/profile', autRequired, profile)


export default router;