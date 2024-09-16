import { Router } from "express";
import { signUp, logIn } from "../controllers/Authcontroller.js";
import { signupValidation, loginValidation } from "../middlewares/AuthValidation.js";

const router = Router()

router.post("/login", loginValidation, logIn)
router.post("/singup", signupValidation, signUp)

export default router