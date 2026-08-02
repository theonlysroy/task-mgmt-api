import { config } from "@/lib/config.js";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "Team task-management REST API",
    },
    servers: [{ url: config.serverUrl }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [{ name: "Auth" }, { name: "Task" }, { name: "Workspace" }],
  },
  apis: ["./src/api/**/router.ts", "./src/api/**/schema.ts"], // where it looks for JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(options);
