import type {RestypedBase, RestypedRoute} from 'restyped'
import { Router } from 'worktop'
import type { ServerRequest } from 'worktop/request'
import type { ServerResponse } from 'worktop/response'

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

  add<
    Path extends keyof APIDef,
    Method extends HTTPMethod
  >(
    method: Method,
    path: Path,
    handler: (
      req: TypedRequest<APIDef[Path][Method]>,
      res: ServerResponse
    ) => Promise<APIDef[Path][Method]['response']>
  ) {

    this.worktopRouter.add(method, path as string, handler)

    // route(path, function(req, res, next) {
    //   return handler(req, res)
    //     .then(result => {
    //       if (!res.headersSent) {
    //         res.send(result)
    //       }
    //     })
    //     .catch(err => next(err))
    // })
  }
}