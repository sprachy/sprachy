import { db } from "~/server/db"
import { sessions } from '~/server/sessions'
import { prisma } from "../prisma"

export default defineEventHandler(async (event) => {
  const { session } = event.context

  const userWithProgress = prisma.user.findUnique({
    where: {
      id: session!.userId
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
    },
  })


  if (!user) {
    // Invalid session, e.g. when the user was deleted
    await sessions.expire(session!.sessionKey)
    throw createError({
      statusCode: 401,
      statusMessage: 'Login required'
    })
  }

  return {}
})