import { Router } from "express";
import { updateUserInfo } from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();
userRouter.patch("/user", verifyToken, updateUserInfo);
export default userRouter;