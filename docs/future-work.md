# Future work and production hardening

The current backlog includes MongoDB pool configuration and metrics, Prometheus/Grafana monitoring, log collection, and robust JWT payload handling. The following items extend that backlog.

## Correctness

- Install and enforce refresh-token request validation.
- Correct hashed refresh-token lookup and implement atomic rotation.
- Reassign validated body, params, and query values.
- Validate JWT claims at runtime and distinguish access tokens from refresh tokens.
- Add transaction coverage for invitation acceptance and related membership writes.
- Decide whether the API version setting should mount v2 or accept only the implemented version.

## Tests and quality

- Add unit tests for schemas, token services, response helpers, and permission rules.
- Add integration tests for MongoDB-backed services.
- Add end-to-end tests for registration, login, refresh, tasks, workspaces, invitations, and failure cases.
- Add ESLint and configuration so `pnpm lint` is meaningful.
- Add CI for install, lint, formatting, type checking, build, and tests.
- Add API contract checks for generated OpenAPI documentation.

## Security

- Hash and expire invitation tokens.
- Add refresh-token reuse detection and session revocation.
- Add CSRF protections for cookie-authenticated browser clients.
- Add endpoint-specific rate limits.
- Add secret rotation and a managed secret store in deployment.
- Redact sensitive request headers and fields from logs.
- Add security headers and CORS integration tests.

## Reliability and operations

- Add MongoDB pool sizing and connection status metrics.
- Add dependency-aware liveness and readiness checks.
- Add queue retry, backoff, dead-letter, and idempotency policies.
- Move email sending off synchronous request paths.
- Add metrics and dashboards with Prometheus and Grafana.
- Configure centralized log collection and rotation.
- Add graceful draining for HTTP, MongoDB, Redis, and workers.

## Product capabilities

- Add task update, deletion, assignment, filtering, pagination, and workspace scoping.
- Add workspace member removal, invitation cancellation, and role changes.
- Add password reset and email verification.
- Add audit events for authentication and authorization changes.
