import { Task } from "@/api/task/model.js";
import type { TaskRequest, TaskResponse } from "@/api/task/schema.js";
import { User } from "@/api/user/model.js";
import { ApiError } from "@/lib/ApiError.js";

const createTaskService = async (args: TaskRequest["body"]): Promise<TaskResponse> => {
  const { title, description, assignedTo } = args;
  if (assignedTo) {
    const user = await User.findById(assignedTo);
    if (!user) throw ApiError.badRequest("Asignee user not found");
    const newTask = await Task.create({
      title,
      description,
      assignedTo: user._id,
    });
    if (!newTask) throw ApiError.internalError("Task creation failed");
    return {
      taskId: newTask._id.toString(),
    };
  }
  const newTask = await Task.create({
    title,
    description,
  });
  if (!newTask) throw ApiError.internalError("Task creation failed");
  return {
    taskId: newTask._id.toString(),
  };
};

export const taskService = {
  createTaskService,
};
