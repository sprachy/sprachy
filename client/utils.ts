import type { ZodIssue } from "zod"

/** parseInt, but throw an error if it's NaN. */
export function expectInt(str: string): number {
  const val = parseInt(str)
  if (isNaN(val)) {
    throw new Error(`Unexpected NaN when parsing string '${str}'`)
  }
  return val
}

// type UnhandledAPIResponse =
//   { status: 401, code: 'login required' } |
//   { status: 403, code: 'admin only' } |
//   { status: 500, code: 'unexpected error' } |
//   never

export function otherResponse(res: never): never {
  throw (res as any).axiosError || new Error(JSON.stringify(res))
}

/**
 * Converts the more detailed ZodIssues into a simple
 * mapping of field name => validation message.
 */
export function errorsByField(issues: ZodIssue[]) {
  const errors: Record<string, string> = {}
  for (const issue of issues) {
    for (const field of issue.path) {
      errors[field as string] = issue.message
    }
  }
  return errors
}