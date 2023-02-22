import { sessions } from '~/server/sessions'

export default defineEventHandler(async (event) => {
  const { session } = event.context
  if (session) {
    await sessions.expire(session.sessionKey)
  }
  return { success: true }
})