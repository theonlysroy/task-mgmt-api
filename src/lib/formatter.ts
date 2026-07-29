import type { ZodError } from "zod";

export const zodErrorFormatter = (error: ZodError): string[] => {
  const issues = error.issues;
  const formattedError: string[] = [];
  issues.map((issue) => {
    const errorField = String(issue.path[1] ?? issue.path[0]);
    formattedError.push(`${errorField} => ${issue.message}`);
  });
  return formattedError;
};
