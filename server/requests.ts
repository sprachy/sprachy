import type {RestypedBase, RestypedRoute} from 'restyped'
import { Router } from 'worktop'
import type { ServerRequest } from 'worktop/request'
import type { ServerResponse } from 'worktop/response'
import type { APISchema, Pattern, User } from '../common/api'
import { sessions } from './sessions'
import * as cookie from "cookie"

export interface TypedRequest<T extends RestypedRoute> extends ServerRequest {
  body: {
    (): Promise<T['body']>
    json<T=any>(): Promise<T>
    arrayBuffer(): Promise<ArrayBuffer>
    formData(): Promise<FormData>
    text(): Promise<string>
    blob(): Promise<Blob>
  }
  params: T['params']
  query: T['query']
}

type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'

export class APIRouter {
  worktopRouter = new Router()

  add<Path extends keyof APISchema, Method extends HTTPMethod>(
    method: Method,
    path: Path,
    handler: (req: ServerRequest, res: ServerResponse) => Promise<APISchema[Path][Method]['response']>
  ) {

    this.worktopRouter.add(method, path as string, async (req, res) => {
      const obj = await handler(req, res)
      if (obj) {
        res.send(200, obj)
      }
    })
  }
}

export async function getSession(req: ServerRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '')
  const sessionKey = cookies['sessionKey']
  return sessionKey ? await sessions.get(sessionKey) : null
}

export class AdminRouter {
  constructor(readonly api: APIRouter) {}

  add<
    Path extends keyof APISchema,
    Method extends HTTPMethod
  >(
    method: Method,
    path: Path,
    handler: (
      req: RequestType,
      res: ServerResponse
    ) => Promise<APISchema[Path][Method]['response']>
  ) {

    this.worktopRouter.add(method, path as string, async (req, res) => {
      const obj = await handler(req as RequestType, res)
      if (obj) {
        res.send(200, obj)
      }
    })
  }

}