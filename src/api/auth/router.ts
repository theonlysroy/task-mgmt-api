import { loginController } from "@/api/auth/controller.js";
import { loginReqSchema } from "@/api/auth/schema.js";
import { validate } from "@/api/middlewares/validate.js";
import { logger } from "@/lib/logger.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login/:random", validate(loginReqSchema, "body"), loginController);

export { authRouter };
