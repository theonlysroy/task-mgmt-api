import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";

export const createTaskController = asyncHandler(async (req, res) => {
  apiResponse.created(res, {}, "Task created");
});
