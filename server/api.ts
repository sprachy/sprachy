import * as auth from './resources/auth'
import * as usersAdmin from './resources/usersAdmin'
import * as progress from './resources/progress'
import { BaseRouter, RequireLoginRouter, AdminRouter } from './middleware'
import { db } from './db'

export const api = new BaseRouter()
api.add('POST', '/api/signup', auth.signup)
api.add('POST', '/api/login', auth.login)
api.add('POST', '/api/logout', auth.logout)

const userApi = new RequireLoginRouter(api)
userApi.add('GET', '/api/status', progress.getStatus)
userApi.add('GET', '/api/progress/nextLesson', progress.getNextLesson)
userApi.add('POST', '/api/progress', progress.recordReview)

userApi.add('GET', '/api/progress/overview', async req => {
  return {
    patterns: await db.patterns.listAll(),
    progress: await db.progress.withNextReviewTime(req.session.userId)
  }
})

userApi.add('GET', '/api/progress/reviews', async req => {
  return {
    reviews: await db.progress.getReviewsFor(req.session.userId)
  }
})

userApi.add('GET', '/api/pattern/:slug', async req => {
  return await db.patterns.get(req.params.slug as string)
})

const adminApi = new AdminRouter(userApi)
adminApi.add('GET', '/api/admin/users', usersAdmin.listUsers)
