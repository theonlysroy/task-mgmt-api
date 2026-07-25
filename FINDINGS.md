## Specific Findings while development

- Custom `Req` type over `Request` type for express request in the controller is required when needed to type define the request object with the `req.body`, `req.params` and `req.query` after validations. This change requires in `asyncHandler`, else type error in the *controller*.

- zod v4 -> `ZodObject` provides more api on the object. `ZodType` provides the base class for all zod schema and types. Better to use `ZodType` in the `ValidatedRequest` helper type definition as it doesn't require any extra zod APIs and more configurable.

- Validators need to check for `body`, `params` and `query` request objects and reassign each after safe parsing

- __api response__ custom helper to remove res.status().json() repeating and having structured API response object

- `ApiError` and _static methods_ to handle the errors with structured error responses

- JWT `jsonwebtoken` sign() function type error - need to add `SignOptions` or `StringValue` type parsing from the npm package - `ms`
