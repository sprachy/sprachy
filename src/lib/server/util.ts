import { omit } from 'lodash'

export function jsonResponse(body: any, init?: ResponseInit): Response {
  const headers = Object.assign({
    'content-type': 'application/json;charset=UTF-8'
  }, init?.headers)

  return new Response(
    JSON.stringify(body),
    Object.assign({
      status: 200,
      headers,
    }, omit(init, 'headers'))
  )
}