# API guide

The current base URL is `/api/v1`. Swagger UI at `/docs` is the interactive reference generated from route comments.

## Endpoints

### Authentication

| Method | Route                 | Auth | Purpose                                 |
| ------ | --------------------- | ---- | --------------------------------------- |
| POST   | `/auth/register`      | No   | Create a user account                   |
| POST   | `/auth/login`         | No   | Verify credentials and issue tokens     |
| POST   | `/auth/refresh-token` | No   | Exchange a refresh token for new tokens |

Registration validates email, name, password complexity, and role (`admin` or `member`). Login validates email and a minimum password length.

### Tasks

| Method | Route          | Auth | Purpose                              |
| ------ | -------------- | ---- | ------------------------------------ |
| POST   | `/task/create` | Yes  | Create a task                        |
| GET    | `/task`        | Yes  | Fetch the authenticated user's tasks |
| GET    | `/task/:id`    | Yes  | Fetch one task by id                 |

Tasks contain an owner, title, description, completion state, and optional assignee.

### Workspaces

| Method | Route                                 | Auth | Purpose                                                         |
| ------ | ------------------------------------- | ---- | --------------------------------------------------------------- |
| POST   | `/workspace`                          | Yes  | Create a workspace and make the user its owner and first member |
| GET    | `/workspace/:id`                      | Yes  | Read a workspace as an owner or member                          |
| POST   | `/workspace/:id/invite`               | Yes  | Owner invites an existing user                                  |
| GET    | `/workspace/invitation/:token/accept` | No   | Accept an invitation token                                      |

The invitation model records workspace, recipient email, inviter, token, expiry, and acceptance state. Invitation acceptance is intentionally a public link, but the service must still identify the intended recipient before changing membership.

### Health and fallback

- `GET /health` checks the API route and currently queues a notification job.
- Unknown v1 routes result in a structured not-found error.

## Authentication headers

The authentication middleware accepts either:

```http
Authorization: Bearer <access-token>
```

or the `accessToken` cookie. It verifies the JWT, loads the user by the payload id, and assigns `req.user` for downstream handlers.

## Validation convention

Schemas wrap request parts:

```ts
z.object({
  body: z.object({/* fields */}),
  params: z.object({/* fields */}),
  query: z.object({/* fields */}),
});
```

`validate()` parses the selected part or all parts, formats Zod errors, and forwards an `ApiError` to the global handler. Controllers use `ValidatedRequest<typeof schema>` when they need typed validated input.

When changing validation, ensure parsed `body`, `params`, and `query` values are all assigned back to the request. Reassignment matters when Zod applies transforms, defaults, trimming, or coercion.

## Response and error conventions

Use `apiResponse` rather than repeating `res.status().json()`. Success helpers include `ok`, `created`, `updateOrDelete`, and `noContent`. Use `ApiError` static methods for expected failures such as unauthorized, forbidden, not found, conflict, and validation failure. The global handler owns the final error shape.

## Adding an endpoint

1. Create or update schema, model, service, controller, and router files.
2. Add authentication and validation middleware in the correct order.
3. Mount the router under the v1 router.
4. Add OpenAPI comments.
5. Check ownership and authorization explicitly in the service.
6. Add a failure path for invalid ids, missing records, and duplicate operations.
7. Update this guide if the public API changed.
