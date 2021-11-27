import * as auth from './resources/auth'
import * as usersAdmin from './resources/usersAdmin'
import * as progress from './resources/progress'
import { BaseRouter, RequireLoginRouter, AdminRouter } from './middleware'

export const api = new BaseRouter()
api.add('POST', '/api/signup', auth.signup)
api.add('POST', '/api/login', auth.login)
api.add('POST', '/api/logout', auth.logout)

const userApi = new RequireLoginRouter(api)
userApi.add('GET', '/api/progress', progress.getSummary)
userApi.add('POST', '/api/progress', progress.recordReview)

const adminApi = new AdminRouter(userApi)
adminApi.add('GET', '/api/admin/users', usersAdmin.listUsers)
