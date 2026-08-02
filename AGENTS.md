# TaskFlow backend agent guide

## Project purpose

TaskFlow is a TypeScript/Express REST API for team task management. The current API supports user registration and login, JWT access/refresh tokens, authenticated task creation and retrieval, and authenticated workspace creation, lookup, and member invitation. MongoDB stores users, refresh tokens, tasks, and workspaces. Swagger UI is served at `/docs`.

## Stack and dependencies

- Node.js ESM (`"type": "module"`) with TypeScript, strict compiler settings, and NodeNext module resolution.
- Express 5 with `helmet`, `cors`, `cookie-parser`, `express-rate-limit`, and `morgan` for HTTP security, policy, limiting, cookies, and access logging.
- Mongoose 9 and MongoDB for persistence; `bcryptjs` hashes passwords and refresh tokens.
- Zod 4 validates environment values and request bodies/parameters. `jsonwebtoken` creates and verifies JWTs; `date-fns` calculates refresh-token expiry.
- Nodemailer provides SMTP delivery and the Resend SDK is also present. `swagger-jsdoc` and `swagger-ui-express` generate and serve OpenAPI documentation.
- pnpm 11.0.8 is the declared package manager. Dependency versions are locked in `pnpm-lock.yaml`.

## Repository layout and architecture

- `src/index.ts` is the process entry point. It loads the app/config, connects to MongoDB, starts the HTTP listener, and handles SIGINT, SIGTERM, uncaught exceptions, and unhandled rejections by closing Mongoose and exiting.
- `src/app.ts` constructs the Express app. Middleware order is security headers, Morgan access logging, the global rate limiter, CORS, signed-cookie parsing, JSON/urlencoded body parsing, API routes, Swagger UI, then the global error handler.
- `src/api/v1/router.ts` mounts `/auth`, `/task`, `/workspace`, and `/health` under `/api/v1`. Unknown v1 routes throw an `ApiError`.
- Each feature under `src/api/<feature>/` follows controller/router/model/schema/service separation. `auth` also has token types and a refresh-token model; `user` currently contains the user model only.
  - `auth`: registration, login, refresh-token rotation, password hashing, JWT creation, and welcome email dispatch.
  - `task`: authenticated task creation, all-task retrieval, and retrieval by task id. Tasks belong to a user and may reference an assignee.
  - `workspace`: authenticated creation, membership-checked lookup, and owner-only member invitation.
- `src/api/middlewares/auth.ts` accepts a Bearer token or `accessToken` cookie, verifies it, loads the user, and assigns `req.user`. `validate.ts` parses request body/params/query with Zod and forwards failures to the global handler.
- `src/lib/` contains cross-cutting infrastructure: environment/config loading, MongoDB connection, response and error helpers, logging, security policies, Swagger, token/email providers, and constants/messages. `src/types.ts` defines `ValidatedRequest`; `src/express.d.ts` augments Express `Request` with `user`.
- `src/scripts/` contains the CommonJS module scaffold and environment-example generator. `dist/` is generated output from the TypeScript build and is ignored by Git.

## Development and verification commands

Run commands from the repository root with pnpm:

```bash
pnpm install
pnpm dev                 # NODE_ENV=development tsx watch src/index.ts
pnpm build               # clears dist, runs tsc, then tsc-alias
pnpm start               # NODE_ENV=production node dist/index.js
pnpm type-check          # tsc --noEmit
pnpm format:check        # prettier --check .
pnpm format              # prettier --write .
pnpm lint                # eslint .
pnpm lint:fix            # eslint . --fix
pnpm new:module <name>   # creates empty controller/router/model/schema/service files
```

There is no test script, test directory, test configuration, or CI workflow in this repository. `pnpm type-check`, `pnpm build`, and `pnpm format:check` currently complete successfully in the checked-out environment. `pnpm lint` is configured in `package.json` but currently fails because `eslint` and an ESLint configuration are not present in the project; do not treat that command as a passing validation until the tooling is added.

For local MongoDB, `docker compose up` starts MongoDB and Mongo Express only; the API itself runs on the host with `pnpm dev`. `docker-compose.prod.yml` starts MongoDB as an authenticated single-node replica set for transaction support and requires the ignored `mongodb-keyfile`. Both Compose files contain local/demo credentials in the configuration; never reuse them for real deployments or copy credentials into documentation.

## IMPORTANT NOTE TO FOLLOW BY THE AGENTS

- Don't run the build script `pnpm build`.
- Don't run the type check script `pnpm type-check`.
- Don't run the format check `pnpm format:check` or format `pnpm format` scripts.
- Don't do any end-to-end or unit testing for the code you are writing unless explicitly mentioned in the prompt or asked to do.

## Configuration and operations

- Copy `.env.example` to `.env.local` for development and replace every placeholder. Development config explicitly loads `.env.local`; non-development config loads `.env.prod`. Neither file is tracked. There is no application container or `.env.prod` template in the repository.
- Required configuration groups are server (`NODE_ENV`, `PORT`, `HOST`, `API_VERSION`), MongoDB (`MONGO_HOST`, `MONGO_PORT`, `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_DB_NAME`), cookie/JWT secrets and TTLs, and SMTP/Resend values (`RESEND_API_KEY`, `EMAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`). Environment values are reshaped by `buildRawEnvData` and validated by `envSchema` at import time.
- `HOST` and `MONGO_HOST` are validated as IPv4 addresses. `API_VERSION` is currently limited to `v1` or `v2`, although only v1 is mounted. SMTP ports are limited to the list in `AppConstants.smtp.allowedPorts`.
- `src/lib/db.ts` builds a MongoDB URI with `authSource=admin&retryWrites=false`. MongoDB transactions/sessions need the replica-set Compose setup, not the standalone development Compose setup.
- The logger creates `logs/app.log` and `logs/access.log` under the working directory. Logs are ignored by Git; use external rotation such as logrotate for long-running deployments.
- Swagger is generated from OpenAPI comments in `src/api/**/router.ts` and `src/api/**/schema.ts`. The advertised server URL is derived from the configured host, port, API version, and environment.

## Coding conventions

- Use TypeScript source files under `src`; keep ESM import specifiers ending in `.js` even when importing `.ts` source. Use the configured aliases (`@/*`, `@lib/*`, `@utils/*`, and `@middlewares/*`) consistently. `tsc-alias` rewrites aliases in the build output.
- Keep the feature layering: routers compose middleware/controllers, controllers call services and use `apiResponse`, services own business/database operations, schemas define request/response types, and models define Mongoose persistence.
- Use `asyncHandler` for async Express handlers, `ApiError` for expected failures, and let `globalErrorHandler` produce the structured error response. Successful responses use `apiResponse.ok`, `.created`, `.updateOrDelete`, or `.noContent`.
- Request schemas wrap validated data in `body`, `params`, and/or `query`. The validation middleware must parse the relevant request parts and assign parsed values back to the request. Use `ValidatedRequest<typeof schema>` in controllers when the validated shape is needed.
- Prettier is authoritative: two spaces, no tabs, double quotes, semicolons, trailing commas, arrow parens, and 120-column print width. File and directory names are lowercase and feature-oriented.
- Add OpenAPI comments alongside new routes/schemas when exposing an endpoint. A new module created by `pnpm new:module` is only a scaffold: wire its router into `src/api/v1/router.ts` and implement its files.

## Important gotchas and existing notes

- `src/api/auth/router.ts` defines a refresh-token Zod schema, but the refresh-token route currently does not install `validate`; add validation before relying on the inferred request shape.
- The environment/config module performs validation during import and calls `process.exit(1)` on failure, so missing or malformed environment values can terminate any command that imports the app.
- The development email service uses the SMTP provider selected by `emailService`; registration sends a welcome email synchronously through that provider. Configure a reachable development SMTP service before exercising registration.
- JWT refresh values are hashed before being stored, but the refresh endpoint currently looks up the supplied token directly by `tokenHash`; preserve or correct this behavior deliberately when changing token rotation.
- The existing `FINDINGS.md` records implementation-specific notes about `ValidatedRequest`, Zod v4, structured responses, `ApiError`, JWT option typing, Mongoose documents, and MongoDB replica-set authentication. Consult it before changing those areas.
- `TASKS.md` lists unfinished operational work: MongoDB pool/status metrics, Prometheus/Grafana/log monitoring, and JWT payload handling. Treat it as a backlog, not as implemented behavior.
- `src/scripts/generate_example_env.cjs` defaults to reading `.env` and writing `.env.example`; ensure its input is not committed secret material before running it.
- Do not commit `.env*` files, `mongodb-keyfile`, logs, `node_modules`, or generated `dist` output. Never place secret values or credentials in source, commits, or agent documentation.
