import { loginController, registerController } from "@/api/auth/controller.js";
import { loginReqSchema, registerReqSchema } from "@/api/auth/schema.js";
import { validate } from "@/api/middlewares/validate.js";
import { logger } from "@/lib/logger.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", validate(loginReqSchema, "body"), loginController);
authRouter.post("/register", validate(registerReqSchema, "body"), registerController);

export { authRouter };
