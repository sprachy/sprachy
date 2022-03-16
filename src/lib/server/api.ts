import * as auth from './resources/auth'
import * as usersAdmin from './resources/usersAdmin'
import * as progress from './resources/progress'
import * as account from './resources/account'
import { BaseMiddleware, RequireLoginMiddleware, AdminMiddleware } from './middleware'

export const api = new BaseMiddleware()
api.add('POST', '/api/signup', auth.signup)
api.add('POST', '/api/login', auth.login)
api.add('POST', '/api/logout', auth.logout)
api.add('POST', '/api/reset-password', auth.sendPasswordResetEmail)
api.add('POST', '/api/confirm-reset-password', auth.confirmPasswordReset)

const userApi = new RequireLoginMiddleware(api)
userApi.add('GET', '/api/progress', progress.getSummary)
userApi.add('POST', '/api/progress', progress.completeLevel)
userApi.add('POST', '/api/debug/reset-progress', progress.resetProgress)
userApi.add('POST', '/api/debug/timeskip', progress.debugTimeskip)

userApi.add('POST', '/api/account/change-email', account.changeEmail)
userApi.add('POST', '/api/account/confirm-email-change', account.confirmEmailChange)

const adminApi = new AdminMiddleware(userApi)
adminApi.add('GET', '/api/admin/users', usersAdmin.listUsers)
