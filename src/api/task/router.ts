import { validate } from "@/api/middlewares/validate.js";
import { createTaskController } from "@/api/task/controller.js";
import { taskReqSchema } from "@/api/task/schema.js";
import { Router } from "express";

const taskRouter = Router();

// POST /task
taskRouter.post("/create", validate(taskReqSchema), createTaskController);

export { taskRouter };
