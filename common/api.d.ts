export type Pattern = {
  id: string,
  title: string,
  slug: string,
  explanation: string
}

export interface APISchema {
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



