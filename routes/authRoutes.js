import express from "express";
import { logIn, signUp, updateUserRole, userProfile } from "../controller/userController.js";
import  { logInValidation, signUpValidation } from "../middleware/auth.js";
const router = express.Router();
router.post("/signup", signUpValidation, signUp);
router.post("/login", logInValidation, logIn);
router.get("/profile", userProfile);
router.patch("/role", updateUserRole);

export default router;
