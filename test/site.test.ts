import { dbenv } from './helpers'

test('pattern access rules', async () => {
  const { prisma, asUser, asAdmin } = await dbenv()

  await prisma.patterns.create({
    data: {
      title: "die, der, das",
      slug: "die-der-das"
    }
  })

  const { error, data } = await asUser.supabase.from("patterns").select()
  expect(error).toBe(null)
})