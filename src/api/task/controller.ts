import type { TaskByIdRequest, TaskRequest } from "@/api/task/schema.js";
import { taskService } from "@/api/task/service.js";
import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";

export const createTaskController = asyncHandler(async (req: TaskRequest, res) => {
  const data = await taskService.createTaskService(req.body, req?.user);
  apiResponse.created(res, data, "Task created");
});

/**
 * get single task by id
 */
export const fetchTaskByIdController = asyncHandler(async (req: TaskByIdRequest, res) => {
  const data = await taskService.fetchTaskByIdService(req.params, req?.user);
  apiResponse.ok(res, data, "Task fetched.");
});

export const fetchTasksController = asyncHandler(async (req, res) => {
  const data = await taskService.fetchAllTasks(req?.user ?? {});
  apiResponse.ok(res, data, "All tasks fetched");
});
