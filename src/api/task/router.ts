import { authCheck } from "@/api/middlewares/auth.js";
import { validate } from "@/api/middlewares/validate.js";
import { createTaskController, fetchTaskByIdController, fetchTasksController } from "@/api/task/controller.js";
import { taskReqByIdSchema, taskReqSchema } from "@/api/task/schema.js";
import { Router } from "express";

const taskRouter = Router();

/**
 * @openapi
 * /task/create:
 *  post:
 *    summary: Create Task
 *    description: Authenticated user can create tasks
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 */
taskRouter.post("/create", authCheck, validate(taskReqSchema), createTaskController);

/**
 * @openapi
 * /task:
 *  get:
 *    summary: Fetch all authenticated user tasks
 *    tags: [Task]
 */
taskRouter.get("/", authCheck, fetchTasksController);

/**
 * @openapi
 * /task/:id:
 *  get:
 *    summary: Fetch a user task by task id
 *    tags: [Task]
 */
taskRouter.get("/:id", authCheck, validate(taskReqByIdSchema, "params"), fetchTaskByIdController);

export { taskRouter };
