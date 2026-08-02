# Learning path

This project is easiest to understand by studying one complete request at a time.

## 1. Node.js and TypeScript foundation

Study ESM imports, async functions, process signals, environment variables, strict typing, and the difference between compile-time types and runtime validation. Trace `src/index.ts` and `src/app.ts`.

## 2. Express fundamentals

Follow a request through middleware, routers, controllers, and the global error handler. Learn why middleware order matters and why every async failure must reach `next()` or the shared wrapper.

## 3. Validation and API design

Read the Zod schemas and validation middleware. Compare request parsing with TypeScript types: TypeScript disappears at runtime, while Zod protects the running server. Learn structured success and error responses.

## 4. MongoDB and Mongoose

Trace registration and task creation from controller to service to model. Study references, timestamps, ObjectIds, projections, indexes, duplicate key errors, sessions, and transaction prerequisites.

## 5. Authentication

Read password hashing, login, JWT creation, refresh-token persistence, cookie policy, and `authCheck` together. Then review the refresh-token warnings in [Authentication and security](auth-security.md).

## 6. Authorization and RBAC

Trace workspace owner and member checks. Add a small permission matrix and distinguish global roles from resource membership. Test unauthorized, forbidden, missing-resource, duplicate, and happy paths.

## 7. External services

Follow invitation email generation through the provider abstraction. Learn SMTP authentication, provider APIs, timeout handling, retries, templates, and why email should usually be asynchronous.

## 8. Queues and workers

Trace `/health` to the BullMQ producer and then to the worker. Study Redis connection settings, job retries, idempotency, graceful shutdown, and observability.

## 9. Operations

Study Docker Compose, environment validation, MongoDB replica sets, log rotation, rate limiting, CORS, Helmet, and Swagger. Add health checks that report dependency status rather than only returning HTTP success.

## Practice projects

- Add password reset with one-time hashed tokens.
- Add task update, completion, and deletion with owner checks.
- Add workspace roles and an explicit permission service.
- Move welcome and invitation email delivery to BullMQ.
- Add refresh-token reuse detection and revocation-all-sessions.
- Add request IDs, metrics, and a real readiness endpoint.
- Add integration tests backed by disposable MongoDB and Redis services.
