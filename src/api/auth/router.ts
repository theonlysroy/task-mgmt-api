import { loginController, refreshTokenController, registerController } from "@/api/auth/controller.js";
import { loginReqSchema, registerReqSchema } from "@/api/auth/schema.js";
import { validate } from "@/api/middlewares/validate.js";
import { Router } from "express";

const authRouter = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

authRouter.post("/login", validate(loginReqSchema, "body"), loginController);
authRouter.post("/register", validate(registerReqSchema, "body"), registerController);
/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     summary: Generate new refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Refresh token generation successful
 *       401:
 *         description: Unauthorized
 */
authRouter.post("/refresh-token", refreshTokenController);

export { authRouter };
