import { logger } from "@/lib/logger.js";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", async (req, res, next) => {
  logger.info("Request on /login router");
  res.status(201).json({ message: "done login" });
});

export { authRouter };
