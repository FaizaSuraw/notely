import router from "express";
import { login, register } from "../controllers/auth.controller";
const authRouter = router();

authRouter.post("/register", register)
authRouter.post("/login", login)
export default authRouter;