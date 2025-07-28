import { Router } from "express";
import { getUserProfile, updateUserInfo } from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();
userRouter.get("/user/profile", verifyToken, getUserProfile)
userRouter.patch("/user/profile", verifyToken, updateUserInfo)


export default userRouter;