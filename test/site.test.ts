import { dbenv } from './helpers'

test('does some stuff', async () => {
  const { prisma, asUser } = await dbenv()

  await prisma.patterns.create({
    data: {
      title: "die, der, das",
      slug: "die-der-das"
    }
  })

  const { error, data } = await asUser.supabase.from("patterns").select()
  expect(error).toBe(null)
})