## Specific Findings while development

- Custom `Req` type over `Request` type for express request in the controller is required when needed to type define the request object with the `req.body`, `req.params` and `req.query` after validations. This change requires in `asyncHandler`, else type error in the _controller_.

- zod v4 -> `ZodObject` provides more api on the object. `ZodType` provides the base class for all zod schema and types. Better to use `ZodType` in the `ValidatedRequest` helper type definition as it doesn't require any extra zod APIs and more configurable.

- Validators need to check for `body`, `params` and `query` request objects and reassign each after safe parsing

- **api response** custom helper to remove res.status().json() repeating and having structured API response object

- `ApiError` and _static methods_ to handle the errors with structured error responses

- JWT `jsonwebtoken` sign() function type error - need to add `SignOptions` or `StringValue` type parsing from the npm package - `ms`

- Zod schema to keys - `keyof typeof<schema>`, `Object.keys(schema.shape)`

- `logrotate` linux uitility to automatically rotate any intented logs.

  ```bash
  # /etc/logrotate.d/<app_name>

  /path/to/logs/*.log {
      weekly
      rotate 4
      compress
      delaycompress
      missingok
      notifempty
      copytruncate
  }
  ```

- MongoDB transactions and sessions require a replica set, but the standard MongoDB Docker image starts as a standalone server by default. Standalone instances lack the replication oplog required to track and roll back transactional changes.

- This error happens because you have configured database authentication/authorization (MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD) alongside a replica set (--replSet).When authentication is active, MongoDB requires nodes in a replica set to securely communicate with each other. It enforces this by requiring a shared keyFile

- Extend mongoose model interface using `Document`

- mongoose: the `new` option for `findOneAndUpdate()` and `findOneAndReplace()` is deprecated. Use `returnDocument: 'after'` instead.

- Incorrect type. Expected "string". (yaml-schema: docker-compose.yml 0)

- Docker compose environment two syntaxes -
  - if used List format, need `=` sign to assign value

    ```txt
    - ANY_ENV_VARIABLE=value
    ```

  - if used Dictionary/Map format, remove `-` and use `:` to assign value
    ```txt
      ANY_ENV_VARIABLE: "value"
    ```
