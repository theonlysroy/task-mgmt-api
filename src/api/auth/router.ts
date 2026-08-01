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
 *     security: []
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

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns an access token (and optionally .
 *     security: []
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.doe@example.com
 *               name:
 *                 type: string
 *                 minLength: 4
 *                 example: Jane Doe
 *               password:
 *                 type: string
 *                 description: Must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.
 *                 example: Str0ng!Pass
 *               role:
 *                 type: string
 *                 enum: [admin, member]
 *                 example: member
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - token
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 665f1a2b3c4d5e6f7a8b9c0d
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-07-29T10:00:00.000Z
 *                 token:
 *                   type: object
 *                   required:
 *                     - accessToken
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     refreshToken:
 *                       type: string
 *                       description: Only present if not delivered via httpOnly cookie.
 *       400:
 *         description: Validation error (invalid email, weak password, name too short, or invalid role).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 digit and 1 special character
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                       message:
 *                         type: string
 *       409:
 *         description: A user with this email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with this email already exists
 *       500:
 *         description: Internal server error.
 */
authRouter.post("/register", validate(registerReqSchema, "body"), registerController);

/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     summary: Generate new refresh token
 *     security: []
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
