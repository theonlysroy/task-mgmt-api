import { authCheck } from "@/api/middlewares/auth.js";
import { validate } from "@/api/middlewares/validate.js";
import { createTaskController, fetchTaskByIdController, fetchTasksController } from "@/api/task/controller.js";
import { taskReqByIdSchema, taskReqSchema } from "@/api/task/schema.js";
import { Router } from "express";

const taskRouter = Router();

// POST /task
taskRouter.post("/create", authCheck, validate(taskReqSchema), createTaskController);

// GET /tasks
taskRouter.get("/", authCheck, fetchTasksController);

// GEt /tasks/:id
taskRouter.get("/:id", authCheck, validate(taskReqByIdSchema, "params"), fetchTaskByIdController);

export { taskRouter };
