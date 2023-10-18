import { v4 as uuid } from 'uuid'
import { ofetch } from 'ofetch'

class TestClient {
  loggedIn = false

  constructor(readonly opts?: { email: string, password: string }) { }

  async fetch(path: string, options: Parameters<typeof ofetch>[1]) {
    if (this.opts && !this.loggedIn) {
      const res = await ofetch('http://localhost:5998/api/signup', {
        method: 'POST',
        body: {
          email: this.opts.email,
          password: this.opts.password,
          confirmPassword: this.opts.password
        }
      })
      console.log(res)
    }
    return ofetch(`http://localhost:5998${path}`, options)
  }
}

export const asUser = new TestClient({
  email: `testdork+${uuid()}@yuh.com`,
  password: uuid()
})