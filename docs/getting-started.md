# Getting started

## Prerequisites

- Node.js compatible with the repository toolchain
- pnpm 11.0.8
- Docker and Docker Compose for local MongoDB and Redis
- A development SMTP account or a local SMTP test service if exercising registration and invitations

## Configure the environment

Copy the template and replace every placeholder:

```bash
cp .env.example .env.local
```

Development loads `.env.local`; non-development environments load `.env.prod`. Required groups are:

- Server: `NODE_ENV`, `PORT`, `HOST`, `API_VERSION`
- MongoDB: `MONGO_HOST`, `MONGO_PORT`, `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_DB_NAME`
- Cookies and JWT: `COOKIE_SECRET`, `JWT_SECRET`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL`
- Email: `RESEND_API_KEY`, `EMAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

Configuration is reshaped and validated when imported. A missing or malformed value can terminate the process, so check environment variables first when the application exits immediately. Never commit `.env.local`, `.env.prod`, credentials, or private keys.

`HOST` and `MONGO_HOST` must be valid IPv4 values under the current schema. `API_VERSION` accepts `v1` and `v2`, although only v1 is mounted.

## Start dependencies

```bash
docker compose up -d
```

The development Compose file provides MongoDB and Redis. The API and worker run on the host. The production-style Compose file uses an authenticated single-node MongoDB replica set and is useful for learning transaction prerequisites.

## Install and run

```bash
pnpm install
pnpm dev
```

Run the queue worker in another terminal when using BullMQ:

```bash
pnpm worker:dev
```

Useful commands:

```text
pnpm start          Run compiled production output
pnpm worker        Run compiled worker output
pnpm new:module x  Generate a feature scaffold
```

The repository intentionally has no test script or test suite yet. Project instructions also prohibit running build, type-check, format-check, or tests for documentation work. Before shipping code changes, use the commands documented in `AGENTS.md` according to the task requirements.

## First request

Once the API is running, open:

- `GET /` redirects to `/docs`
- Swagger UI: `/docs`
- Health route: `GET /api/v1/health`

The health endpoint currently enqueues a notification job, so Redis must be reachable if that route is used.

## Suggested learning exercise

1. Register a user.
2. Log in and inspect the access and refresh token behavior.
3. Call a task route with `Authorization: Bearer <access-token>`.
4. Create a workspace and retrieve it as its owner.
5. Invite an existing user and follow the invitation flow.
6. Watch API logs and worker logs while calling the health endpoint.
