import { Task } from "@/api/task/model.js";
import type { TaskByIdRequest, TaskByIdResponse, TaskRequest, TaskResponse } from "@/api/task/schema.js";
import { User } from "@/api/user/model.js";
import { ApiError } from "@/lib/ApiError.js";
import type { Request } from "express";

const createTaskService = async (args: TaskRequest["body"], reqUser: any): Promise<TaskResponse> => {
  if (!reqUser) throw ApiError.unauthorized("Please login to create task");
  const { title, description, assignedTo } = args;
  if (assignedTo) {
    const user = await User.findById(assignedTo);
    if (!user) throw ApiError.badRequest("Asignee user not found");
    const newTask = await Task.create({
      userId: reqUser?.id,
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
    userId: reqUser?.id,
    title,
    description,
  });
  if (!newTask) throw ApiError.internalError("Task creation failed");
  return {
    taskId: newTask._id.toString(),
  };
};

export const fetchTaskByIdService = async (args: TaskByIdRequest["params"], user: any): Promise<TaskByIdResponse> => {
  const { id } = args;
  const singleTask = await Task.findOne({
    userId: user?.id,
    _id: id,
  })
    .select("-__v")
    .lean();
  if (!singleTask) throw ApiError.notFound("Task not found");
  return {
    ...singleTask,
  };
};

export const fetchAllTasks = async (args?: Request["user"]) => {
  if (!args) return {};
  const userId = args?.id || "";
  const user = await User.findById(userId);
  if (!user) throw ApiError.unauthorized();
  const allTasks = await Task.find({
    userId: user._id,
  })
    .select("-__v -updatedAt")
    .lean();
  return allTasks;
};

export const taskService = {
  createTaskService,
  fetchTaskByIdService,
  fetchAllTasks,
};
