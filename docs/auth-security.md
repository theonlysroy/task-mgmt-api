# Authentication and security

## Password authentication

Registration validates password complexity and should hash the password with `bcryptjs` before persistence. Login compares the supplied password with the stored hash. Password hashes must never appear in API responses or logs.

## Access and refresh tokens

The design separates short-lived access tokens from longer-lived refresh tokens:

- **Access token**: sent to protected routes and verified on every request.
- **Refresh token**: used to obtain a new access token and persisted as a hash so a database leak does not reveal usable refresh credentials.

JWT signing and expiry configuration come from environment variables. `jsonwebtoken` option types can require an explicit `SignOptions` or compatible `ms` `StringValue` typing when expiry values are strings.

A complete rotation design should:

1. Verify the supplied refresh token signature and expiry.
2. Locate the corresponding hashed database record safely.
3. Reject revoked, expired, or reused tokens.
4. Revoke the old record.
5. Issue and persist a replacement.
6. Return or set the replacement according to the cookie policy.

### Current refresh-token warning

The refresh schema exists, but the refresh route currently does not install `validate`. Also, token values are hashed before storage while the refresh endpoint is noted as looking up the supplied raw token directly by `tokenHash`. Treat refresh-token behavior as unfinished until both issues are corrected and covered by tests.

## Request authentication

`authCheck` reads a Bearer token or `accessToken` cookie, verifies it with the configured secret, loads the user by JWT id, and attaches the user to Express's request type. Invalid or missing tokens should result in 401 responses.

The payload interface currently includes `id`, `email`, and `role`. JWT payload handling remains a backlog item: validate claims and types rather than trusting a cast, and consider issuer, audience, and token-use claims.

## Authorization and RBAC

Authentication answers "who is this?" Authorization answers "may this user perform this action?" The workspace feature demonstrates resource-level authorization:

- Any authenticated user may create a workspace.
- A workspace member may read it.
- Only the owner may invite members.

The registration role (`admin` or `member`) is not a substitute for resource checks. For future RBAC, centralize permission definitions and enforce them after authentication and before business writes. Always check both role and resource ownership where both apply.

## Cookies and browser security

Cookie parsing is enabled globally. If tokens are placed in cookies, use appropriate `httpOnly`, `secure`, `sameSite`, path, and expiry settings. Configure CORS to allow only intended origins and credentials. Cookie signing protects integrity but does not encrypt values.

## Middleware protections

The app uses Helmet, CORS, a global rate limiter, Morgan logging, body parsers, and a centralized error handler. These are defense-in-depth, not replacements for input validation, authorization, secret management, or safe database queries.

## Security review checklist

- Rotate JWT and cookie secrets without exposing them.
- Rate-limit login, registration, refresh, and invitation endpoints more aggressively than read routes.
- Redact authorization headers and cookies from logs.
- Use HTTPS in deployed environments.
- Make invitation tokens single-use and short-lived.
- Prevent user enumeration in login and registration responses where appropriate.
- Add CSRF protection if browser cookies authenticate state-changing requests.
