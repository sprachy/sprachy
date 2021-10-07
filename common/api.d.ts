import type {RestypedBase} from 'restyped'

export type User = {
  id: string
  email: string
  isAdmin: boolean
}

export type Pattern = {
  id: string
  title: string
  slug: string
  explanation: string
  exercises: {
    content: string
  }[]
}

export type Exercise = Pattern['exercises'][0]

export interface APISchema extends RestypedBase {
  '/api/signup': {
    POST: {
      body: {
        email: string
        password: string
      }
      response: User
    }
  }
  '/api/login': {
    POST: {
      body: {
        email: string
        password: string
      }
      response: { sessionKey: string }
    }
  }
  '/api/admin/patterns': {
    GET: {
      response: Pattern[]
    }
    POST: {
      body: Omit<Pattern, 'id'>
      response: Pattern
    }
  }
  '/api/admin/patterns/:id': {
    GET: {
      params: { id: string }
      response: Pattern
    }
    PATCH: {
      params: { id: string }
      body: Partial<Omit<Pattern, 'id'>>
      response: Pattern
    }
    DELETE: {
      params: { id: string }
      response: void
    }
  }
}



