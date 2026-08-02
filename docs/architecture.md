# Architecture

## Runtime shape

There are two long-running processes:

1. **API process** - `src/index.ts` loads configuration, connects to MongoDB, creates the HTTP listener, and handles shutdown signals.
2. **Worker process** - `src/lib/mq/worker.ts` consumes BullMQ jobs from Redis independently of the API.

MongoDB stores application state. Redis stores queue state. SMTP or Resend handles email delivery. Logs are written under `logs/`.

## Request lifecycle

`src/app.ts` installs middleware in this order:

1. Helmet security headers
2. Morgan request logging
3. Global rate limiting
4. CORS policy
5. Signed-cookie parsing
6. JSON and URL-encoded body parsers
7. Versioned API routes
8. Swagger UI
9. Global error handler

A typical protected request flows as:

```text
HTTP request
  -> security and policy middleware
  -> router
  -> authCheck
  -> validate
  -> controller
  -> service
  -> Mongoose model
  -> structured response
```

Expected failures are represented by `ApiError` and handled centrally. Async controllers should be wrapped with `asyncHandler` so rejected promises reach the error handler.

## Feature layers

Each feature follows a consistent separation of concerns:

- **Router**: URL, HTTP method, middleware composition, and OpenAPI comments.
- **Schema**: Zod request and response shapes.
- **Middleware**: authentication and validation.
- **Controller**: translates HTTP input into a service call and selects the response helper.
- **Service**: business rules and database operations.
- **Model**: Mongoose schema, indexes, references, and persistence behavior.

Cross-cutting code lives in `src/lib/`: configuration, database connection, errors, responses, logging, security policy, tokens, email, queues, and Swagger.

## Repository map

```text
src/
  api/
    auth/       registration, login, refresh-token model and services
    task/       task routes and persistence
    user/       user model
    workspace/  workspace and invitation flow
    middlewares authentication and validation
    v1/         versioned route composition
  lib/          infrastructure and shared helpers
  scripts/      CommonJS developer utilities
  index.ts      API process entry point
  types.ts      validated request types
```

## TypeScript and ESM conventions

The project uses strict TypeScript, NodeNext resolution, and ESM. Source imports keep `.js` extensions even when the source file is `.ts`. Use the configured aliases (`@/`, `@lib/`, `@utils/`, and `@middlewares/`). `tsc-alias` rewrites aliases in compiled output.

When adding an endpoint, keep the feature layering, add validation, use the shared response and error helpers, and add OpenAPI comments alongside the route or schema.
