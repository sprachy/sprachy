import { signup, login } from './resources/auth'
import { createPattern, deletePattern, getPattern, listPatterns, updatePattern } from './resources/patternsAdmin'
import { BaseRouter, RequireLoginRouter, AdminRouter } from './routers'

// If adding a route here, make sure to update the corresponding schema in api.d.ts

export const api = new BaseRouter()
api.add('POST', '/api/signup', signup)
api.add('POST', '/api/login', login)


const userApi = new RequireLoginRouter(api)

const adminApi = new AdminRouter(userApi)
adminApi.add('GET', '/api/admin/patterns/:id', getPattern)
adminApi.add('GET', '/api/admin/patterns', listPatterns)
adminApi.add('POST', '/api/admin/patterns', createPattern)
adminApi.add('PATCH', '/api/admin/patterns/:id', updatePattern)
adminApi.add('DELETE', '/api/admin/patterns/:id', deletePattern)