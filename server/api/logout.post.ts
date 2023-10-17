import { getSessionStore } from "../sessions"

export default defineEventHandler(async (event) => {
  const { session } = event.context
  if (session) {
    const sessions = await getSessionStore(event)
    await sessions.expire(session.sessionKey)
  }
  return { success: true }
})