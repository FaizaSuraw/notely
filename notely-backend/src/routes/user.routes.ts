import { Router } from "express";
import { getUserProfile, updateUserInfo } from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();
userRouter.patch("/user", verifyToken, updateUserInfo);
userRouter.get("/user", verifyToken, getUserProfile);

export default userRouter;