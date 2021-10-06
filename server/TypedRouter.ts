import type {RestypedBase, RestypedRoute} from 'restyped'
import { Router } from 'worktop'
import type { ServerRequest } from 'worktop/request'
import type { ServerResponse } from 'worktop/response'
import type { User } from '../common/api'
import type { Session } from './sessions'

export type SessionRequest = ServerRequest & {
  session: Session
  user: User
}

export type AdminRequest = SessionRequest & {
  user: { admin: true }
}

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

export class TypedRouter<APIDef extends RestypedBase> {
  worktopRouter = new Router()
  before: (req, res, next) => void = ()

  add<
    Path extends keyof APIDef,
    Method extends HTTPMethod
  >(
    method: Method,
    path: Path,
    handler: (
      req: ServerRequest,
      res: ServerResponse
    ) => Promise<APIDef[Path][Method]['response']>
  ) {

    console.log('/api' + path)

    this.worktopRouter.add(method, '/api' + path as string, async (req, res) => {
      const obj = await handler(req, res)
      if (obj) {
        res.send(200, obj)
      }
    })
  }

  include(otherRouter: TypedRouter) {
    
  }
}
