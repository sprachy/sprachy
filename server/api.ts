import * as auth from './resources/auth'
import * as usersAdmin from './resources/usersAdmin'
import * as progress from './resources/progress'
import { APIMiddleware, RequireLoginMiddleware, AdminMiddleware } from './middleware'

export const api = new APIMiddleware()
api.add('POST', '/api/signup', auth.signup)
api.add('POST', '/api/login', auth.login)
api.add('POST', '/api/logout', auth.logout)

const userApi = new RequireLoginMiddleware(api)
userApi.add('GET', '/api/progress', progress.getSummary)
userApi.add('POST', '/api/progress', progress.recordReview)

const adminApi = new AdminMiddleware(userApi)
adminApi.add('GET', '/api/admin/users', usersAdmin.listUsers)
