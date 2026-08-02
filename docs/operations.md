# Operations and troubleshooting

## Common startup failures

### The process exits while importing configuration

Configuration validates at import time and calls `process.exit(1)` on invalid input. Check `.env.local` or `.env.prod`, especially IPv4 host values, SMTP port allow-list values, JWT secrets, and MongoDB credentials.

### MongoDB authentication fails

Make sure the credentials used by the application match the MongoDB initialization credentials and that the URI uses the correct authentication database. Do not copy demo Compose credentials into a real environment.

### Transactions fail with a replica-set error

The ordinary development MongoDB container is standalone. Transactions and sessions require a replica set. Use the replica-set Compose configuration, provide its required private key file securely, and ensure the replica set is initialized before using transactions.

### Replica-set authentication fails

An authenticated replica set requires members to authenticate with one another. MongoDB uses a shared key file for this. File permissions, container mount path, replica-set name, and advertised hostname must all match the Compose configuration.

### Redis or jobs are unavailable

Confirm Redis is running on the configured host and port. Start the worker separately. A successful API request that enqueues a job does not mean the job has been processed; inspect worker logs and Redis connectivity.

### Email operations fail

Registration and invitation flows need a configured provider. Verify SMTP host, allowed port, credentials, sender address, network access, and provider sandbox restrictions. For development, use a test SMTP service rather than a real mailbox.

## Docker Compose YAML pitfalls

Compose environment variables have two valid styles:

```yaml
# list style
- ANY_ENV_VARIABLE=value

# map style
ANY_ENV_VARIABLE: "value"
```

Do not use a list dash with map-style `:` syntax. YAML schema warnings often come from mixing these forms or from unquoted values with unexpected types.

## Known implementation findings

These findings came from development and should be checked before extending the affected areas:

- Use a custom request type based on Express `Request` when a controller needs typed validated body, params, or query data. The wrapper used by `asyncHandler` must preserve the compatible handler type.
- Prefer Zod's `ZodType` in reusable validated-request helper types rather than assuming a `ZodObject` API.
- Validation must parse and reassign every selected request part. The current middleware code should be reviewed because it assigns parsed body data but does not clearly reassign parsed params and query data.
- The refresh-token route needs its validation middleware installed.
- Hashed refresh-token storage must be matched with a safe verification strategy, not a raw-token equality query.
- Mongoose model interfaces should extend `Document` where document behavior is used.
- Use `returnDocument: "after"` instead of deprecated Mongoose `new: true` options.
- JWT payloads should be validated instead of only cast to a TypeScript interface.

## Safe debugging workflow

1. Reproduce from the API boundary with the same headers, cookies, body, and environment a user would use.
2. Check the API log for route and error context.
3. Check worker logs for queued work.
4. Check MongoDB and Redis connectivity independently.
5. Inspect structured error responses, not only stack traces.
6. Fix the root layer: schema, middleware, service, persistence, or infrastructure.
7. Add a regression test when the repository gains test infrastructure.

Never paste secrets, bearer tokens, refresh tokens, cookie values, or private key contents into issues or documentation.
