import { v4 as uuid } from 'uuid'
import { ofetch } from 'ofetch'
import { omit } from 'lodash-es'

class TestClient {
  cookie?: string

  constructor() { }

  async signUp(opts: { email: string, password: string, progressItems: ProgressItem[] }) {
    const res = await ofetch.raw('http://localhost:5998/api/signup', {
      method: 'POST',
      body: {
        email: opts.email,
        password: opts.password,
        confirmPassword: opts.password,
        progressItems: opts.progressItems
      }
    })
    this.cookie = res.headers.get('Set-Cookie')!
  }

  async fetch(path: string, options?: Parameters<typeof ofetch>[1]) {
    const headers: HeadersInit = options?.headers || {}
    if (this.cookie) {
      Object.assign(headers, { cookie: this.cookie })
    }

    return ofetch.raw(`http://localhost:5998${path}`, {
      headers,
      ignoreResponseError: true,
      ...omit(options, 'headers')
    })
  }

  async ofetch(path: string, options?: Parameters<typeof ofetch>[1]) {
    const headers: HeadersInit = options?.headers || {}
    if (this.cookie) {
      Object.assign(headers, { cookie: this.cookie })
    }

    return ofetch(`http://localhost:5998${path}`, {
      headers,
      ...omit(options, 'headers')
    })
  }
}

export async function signUpNewUser(opts: { email?: string, password?: string, progressItems?: ProgressItem[] } = {}) {
  const client = new TestClient()
  await client.signUp({
    email: opts.email || `testdork+${uuid()}@yuh.com`,
    password: opts.password || uuid(),
    progressItems: opts.progressItems || []
  })
  return client
}

export async function visitAsGuest() {
  return new TestClient()
}