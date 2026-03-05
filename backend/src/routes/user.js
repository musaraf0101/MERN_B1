import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.js"

export const userRouter = express.Router()

userRouter.post("/",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logoutUser)