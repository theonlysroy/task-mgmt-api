import { authRouter } from "@/api/auth/router.js";
import { Router } from "express";

const v1ApiRouter = Router();

v1ApiRouter.use("/auth", authRouter);

export default v1ApiRouter;
