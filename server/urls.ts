import * as auth from './resources/auth'
import * as patternsAdmin from './resources/patternsAdmin'
import * as usersAdmin from './resources/usersAdmin'
import * as progress from './resources/progress'
import { BaseRouter, RequireLoginRouter, AdminRouter } from './routers'

// If adding a route here, make sure to update the corresponding schema in api.d.ts

export const api = new BaseRouter()
api.add('POST', '/api/signup', auth.signup)
api.add('POST', '/api/login', auth.login)
api.add('POST', '/api/logout', auth.logout)

const userApi = new RequireLoginRouter(api)
userApi.add('GET', '/api/status', progress.getStatus)
userApi.add('GET', '/api/progress/nextLesson', progress.getNextLesson)
userApi.add('POST', '/api/progress/learn/:patternId', progress.setLearned)


const adminApi = new AdminRouter(userApi)
adminApi.add('GET', '/api/admin/patterns/:id', patternsAdmin.getPattern)
adminApi.add('GET', '/api/admin/patterns', patternsAdmin.listPatterns)
adminApi.add('POST', '/api/admin/patterns', patternsAdmin.createPattern)
adminApi.add('PATCH', '/api/admin/patterns/:id', patternsAdmin.updatePattern)
adminApi.add('DELETE', '/api/admin/patterns/:id', patternsAdmin.deletePattern)
adminApi.add('GET', '/api/admin/users', usersAdmin.listUsers)
