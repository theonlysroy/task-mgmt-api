import { authRouter } from "@/api/auth/router.js";
import { ApiError } from "@/lib/ApiError.js";
import { Router } from "express";

const v1ApiRouter = Router();

v1ApiRouter.use("/auth", authRouter);
v1ApiRouter.get("/health", () => {
  throw ApiError.badRequest();
});
v1ApiRouter.all("*any", async () => {
  throw ApiError.notFound("Requested url not found on API - v1");
});

export default v1ApiRouter;
