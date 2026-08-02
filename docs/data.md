# Data and persistence

## MongoDB connection

`src/lib/db.ts` builds a MongoDB URI with `authSource=admin` and `retryWrites=false`. The application connects before starting the HTTP listener. On shutdown, Mongoose is closed before the process exits.

The standard local MongoDB container is standalone. MongoDB transactions and sessions require a replica set because transactions rely on the replication oplog. Use the production-style Compose configuration for transaction experiments.

## Mongoose models

### User

The user model stores identity and role data. Passwords should be stored as hashes, never plaintext. User lookup is also performed after JWT verification so a deleted or disabled user cannot continue using an otherwise valid token.

### RefreshToken

Refresh-token records contain:

- user reference
- hashed token
- expiry date
- revoked flag
- creation IP and user-agent metadata
- timestamps

A valid token must be unexpired and not revoked. A robust rotation flow should atomically revoke the old record and create a new record, and should detect token reuse.

### Task

Tasks reference their owner and optional assignee. They contain title, description, completion state, and timestamps. Queries must scope results to the authenticated owner or an explicitly authorized workspace context.

### Workspace and WorkspaceInvite

A workspace has a name, owner, and member references. An invitation has a workspace, recipient email, inviter, unique token, expiry, and accepted flag.

## Mongoose and TypeScript lessons

- Extend model interfaces with Mongoose's `Document` type when document members and timestamps are part of the type.
- Import `Document` and `Types` as types where appropriate.
- Use `Types.ObjectId` in TypeScript and `Schema.Types.ObjectId` in schema definitions.
- Prefer `returnDocument: "after"` for `findOneAndUpdate()` and `findOneAndReplace()` instead of the deprecated `new` option.
- Add indexes for high-cardinality lookup fields such as email, token hash, invitation token, and ownership combinations after measuring access patterns.
- Treat database errors separately from expected business errors. A duplicate key error should become a conflict response, not a generic 500.

## Transactions

Use a Mongoose session when multiple writes must succeed or fail together, for example creating related records or accepting an invitation while changing membership. A transaction does not make a standalone MongoDB server transactional; the server must run as a replica set.

For every transaction:

1. Start a session.
2. Start the transaction.
3. Pass the session to every participating query and write.
4. Commit on success.
5. Abort on failure.
6. End the session in `finally`.

## Data safety checklist

- Do not log passwords, raw JWTs, refresh tokens, invitation tokens, or SMTP credentials.
- Do not put secrets in documentation, Compose files intended for deployment, or commits.
- Validate ObjectId input before querying.
- Use projection to avoid returning password hashes and internal token fields.
- Define retention and cleanup for expired refresh tokens and invitations.
