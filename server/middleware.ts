import { Router } from 'worktop'
import type { ServerRequest } from 'worktop/request'
import type { ServerResponse } from 'worktop/response'
import type { User } from '../common/api'
import { Session, sessions } from './sessions'
import { db } from './db'
import * as cookie from "cookie"
import { getFaunaError } from './faunaUtil'

/**
 * Throw this to signal that request processing should
 * abort immediately and return the given http error
 * code + message
 */
export class HTTPError extends Error {
  constructor(readonly code: number, message: string) {
    super(message)
  }
}

type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'


/**
 * Request from a user that may or may not be logged in.
 * If they are, the session property will be available.
 */
export type BaseRequest = ServerRequest & {
  session: Session | null
}

/**
 * Router that checks for session cookie and sends json obj returns from handler
 */
export class BaseRouter {
  worktopRouter: Router = new Router()

  add(method: HTTPMethod, path: string, handler: (req: BaseRequest, res: ServerResponse) => Promise<any>) {
    this.worktopRouter.add(method, path as string, async (req, res) => {
      const cookies = cookie.parse(req.headers.get('cookie') || '')
      const sessionKey = cookies['sessionKey']
      const session = sessionKey ? await sessions.get(sessionKey) : null

      const baseReq = req as BaseRequest
      baseReq.session = session

      try {
        const responseData = await handler(baseReq, res)

        if (responseData !== undefined) {
          res.send(200, JSON.stringify(responseData))
        }
      } catch (err: any) {
        console.error(err)

        if (err instanceof HTTPError) {
          res.send(err.code, err.message)
        } else if ('requestResult' in err) {
          const faunaErr = getFaunaError(err)
          res.send(faunaErr.status, faunaErr)
        } else {
          res.send(500, err.stack)
        }
      }
    })
  }
}

/**
 * Request from a user that is definitely logged in.
 */
export type SessionRequest = ServerRequest & {
  session: Session
}

/**
 * Router that only allows requests with a valid session
 */
export class RequireLoginRouter {
  constructor(readonly parentRouter: BaseRouter) { }

  add(method: HTTPMethod, path: string, handler: (req: SessionRequest, res: ServerResponse) => Promise<any>) {
    this.parentRouter.add(method, path, async (req, res) => {
      if (!req.session) {
        throw new HTTPError(401, "Login required")
      }

      return handler(req as SessionRequest, res)
    })
  }
}

/**
 * Request from a user verified to be an admin.
 */
export type AdminRequest = SessionRequest & {
  user: User
}

/**
 * Router that only allows requests from authorized admin users
 */
export class AdminRouter {
  constructor(readonly parentRouter: RequireLoginRouter) { }

  add(method: HTTPMethod, path: string, handler: (req: AdminRequest, res: ServerResponse) => Promise<any>) {
    this.parentRouter.add(method, path, async (req, res) => {
      const user = await db.users.get(req.session.userId)
      if (!user || !user.isAdmin) {
        throw new HTTPError(403, "Forbidden")
      }

      const adminReq = req as AdminRequest
      adminReq.user = user

      return handler(adminReq, res)
    })
  }
}