import type { ZodIssue } from "zod"

export function tryParseInt(thing: unknown, defaultInt: number): number {
  const val = parseInt(thing as any)
  if (isNaN(val)) {
    return defaultInt
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