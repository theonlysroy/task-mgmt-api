import { authRouter } from "@/api/auth/router.js";
import { taskRouter } from "@/api/task/router.js";
import { workspaceRouter } from "@/api/workspace/router.js";
import { ApiError } from "@/lib/ApiError.js";
import { apiResponse } from "@/lib/apiResponse.js";
import { ErrorMsg, SuccessMsg } from "@/lib/messages.js";
import { addNotificationJobs } from "@/lib/mq/producer.js";
import { Router } from "express";

const v1ApiRouter = Router();

v1ApiRouter.use("/auth", authRouter);
v1ApiRouter.use("/task", taskRouter);
v1ApiRouter.use("/workspace", workspaceRouter);
v1ApiRouter.get("/health", async (req, res) => {
  // throw ApiError.badRequest();
  // [NOTE] health checks for required services and then return the status
  await addNotificationJobs({ endpoint: "/health", requested_ip: req.ip, requested_host: req.host });
  apiResponse.ok(res, SuccessMsg.apiV1Health);
});
v1ApiRouter.all("*any", async () => {
  throw ApiError.notFound(ErrorMsg.routeNotFound);
});

export default v1ApiRouter;
