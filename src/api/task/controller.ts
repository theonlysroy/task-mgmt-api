import type { TaskRequest } from "@/api/task/schema.js";
import { taskService } from "@/api/task/service.js";
import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";

export const createTaskController = asyncHandler(async (req: TaskRequest, res) => {
  const data = await taskService.createTaskService(req.body);
  apiResponse.created(res, data, "Task created");
});
