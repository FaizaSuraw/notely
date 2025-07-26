import router from "express";
import { login, logout, register, updatePassword } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";
const authRouter = router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout);
authRouter.post("/password", verifyToken, updatePassword);
export default authRouter;