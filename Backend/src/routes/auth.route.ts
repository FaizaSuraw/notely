import router from "express";
import { register } from "../controllers/auth.controller";
const authRouter = router();

authRouter.post("/register", register)

export default authRouter;