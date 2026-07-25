import { authRouter } from "@/api/auth/router.js";
import { ApiError } from "@/lib/ApiError.js";
import { apiResponse } from "@/lib/apiResponse.js";
import { ErrorMsg, SuccessMsg } from "@/lib/messages.js";
import { Router } from "express";

const v1ApiRouter = Router();

v1ApiRouter.use("/auth", authRouter);
v1ApiRouter.get("/health", (req, res) => {
  // throw ApiError.badRequest();
  // [NOTE] health checks for required services and then return the status
  apiResponse.ok(res, SuccessMsg.apiV1Health);
});
v1ApiRouter.all("*any", async () => {
  throw ApiError.notFound(ErrorMsg.routeNotFound);
});

export default v1ApiRouter;
