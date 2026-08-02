# TaskFlow Backend Handbook

TaskFlow is a deliberately practice-oriented TypeScript REST API for learning how a production-style backend is assembled. It combines Express, MongoDB, Mongoose, authentication, authorization, email delivery, Redis-backed jobs, validation, security middleware, logging, and API documentation.

This handbook is written as a learning guide and a future troubleshooting reference. It documents both the intended design and important limitations that are currently present in the codebase.

## Start here

1. [Learning path](learning-path.md) - a recommended order for studying the project.
2. [Getting started](getting-started.md) - local setup and useful commands.
3. [Architecture](architecture.md) - request flow, layers, and repository layout.
4. [API guide](api.md) - routes, authentication, and response conventions.
5. [Data and persistence](data.md) - MongoDB, Mongoose models, and transactions.
6. [Authentication and security](auth-security.md) - passwords, JWTs, cookies, and authorization.
7. [Queues and external services](services.md) - BullMQ, Redis, SMTP, Resend, and Swagger.
8. [Operations and troubleshooting](operations.md) - configuration, logs, Docker, and known issues.
9. [Future work](future-work.md) - backlog and production hardening ideas.

## Project status

Implemented areas include registration, login, refresh-token infrastructure, authenticated tasks, workspace creation and membership checks, owner-only invitations, email templates/providers, Swagger UI, Redis/BullMQ scaffolding, and operational logging.

This is a learning project, not a production-ready deployment. Read the known issues sections before relying on any behavior, especially refresh-token validation and rotation, request validation, JWT payload typing, and environment requirements.

## Source of truth

The source code and OpenAPI comments are authoritative. These documents explain the concepts and current design, but should be updated when routes or infrastructure change. Swagger UI is available at `/docs` when the application is running.
