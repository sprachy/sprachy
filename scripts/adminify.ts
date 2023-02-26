import { prisma } from "../server/prisma"

export async function adminify(email: string) {
  await prisma.user.update({
    where: { email },
    data: { isAdmin: true },
  })
  console.log(`${email} now has admin powers~`)
}

adminify(process.argv[2])