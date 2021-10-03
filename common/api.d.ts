export type User = {
  email: string
}

export type Pattern = {
  id: string,
  title: string,
  slug: string,
  explanation: string
}

export interface APISchema {
  '/signup': {
    POST: {
      body: {
        email: string
        password: string
      }
      response: User
    }
  }
  '/login': {
    POST: {
      body: {
        email: string
        password: string
      }
      response: User
    }
  }
  '/patterns': {
    GET: {
      response: Pattern[]
    }
    POST: {
      body: Omit<Pattern, 'id'>
      response: Pattern
    }
  }
  '/patterns/:id': {
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



