import { sessions } from '~/server/sessions'
import { prisma } from "../prisma"

export default defineEventHandler(async function whoami(event): Promise<{ status: 'guest' } | { status: 'user', user: UserWithProgress }> {
  const { session } = event.context

  if (!session) {
    return { status: 'guest' }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      learnedLemmas: {
        select: {
          lemma: true
        }
      }
    }
  })


  if (!user) {
    // Invalid session, e.g. when the user was deleted
    await sessions.expire(session.sessionKey)
    return { status: 'guest' }
  }

  return {
    status: 'user',
    user: {
      ...user,
      learnedLemmas: user.learnedLemmas.map(l => l.lemma)
    }
  }
})