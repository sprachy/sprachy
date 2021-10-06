import { signup, login } from './resources/auth'
import { createPattern, deletePattern, getPattern, listPatterns, updatePattern } from './resources/patternsAdmin'
import { getSession, TypedRouter } from './requests'
import { TypedRouter } from './TypedRouter'
import type { ServerRequest } from 'worktop/request'
import type { AdminRequest, SessionRequest } from './TypedRouter'
import type { ServerResponse } from 'worktop/response'
import * as db from './db'

// If adding a route here, make sure to update the corresponding schema in api.d.ts


export const api = new TypedRouter()
api.add('POST', '/api/signup', signup)
api.add('POST', '/api/login', login)



api.add('GET', '/api/admin/patterns/:id', getPattern)
api.add('GET', '/api/admin/patterns', listPatterns)
api.add('POST', '/api/admin/patterns', createPattern)
api.add('PATCH', '/api/admin/patterns/:id', updatePattern)
api.add('DELETE', '/api/admin/patterns/:id', deletePattern)


type Endpoint<T> = (req: ServerRequest, res: ServerResponse) => Promise<T>
type AdminEndpoint<T> = (req: AdminRequest, res: ServerResponse) => Promise<T>

class HTTPError extends Error {
  constructor(code: number, message: string) {
    super(message)
  }
}

// function adminRequired<T>(handler: AdminEndpoint<T>): Endpoint<T> {
//   return async function(req: ServerRequest, res: ServerResponse) {
//     const session = await getSession(req)
//     if (!session) {
//       throw new HTTPError(401, "Login required")
//     } 

//     const user = await db.users.get(session.userId)
//     if (!user.isAdmin) {
//       throw new HTTPError(403, "Forbidden")
//     }

//     return handler(req as AdminRequest, res)
//   }
// }