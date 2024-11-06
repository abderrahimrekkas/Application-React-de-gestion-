import express from "express";
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter=express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.get("/check-auth", verifyToken, checkAuth);

export default authRouter;