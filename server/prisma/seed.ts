import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      email: `admin@naperg.com`,
      name: 'Admin Naperg',
      password: await bcrypt.hash('admin', 10),
      role: 'ADMIN',
      resetPasswordToken: '123',
      validateEmailToken: '',
      isEmailValidated: true,
    },
  })

  seedSources()

  // TODO: Insert some sources here.

  console.log({ user })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

const sourcesUrl = [
  'https://news.un.org/feed/subscribe/ru/tags/piracy/feed/rss.xml',
  'https://news.un.org/feed/subscribe/ru/tags/disarmament/feed/rss.xml',
  'https://news.un.org/feed/subscribe/ru/news/topic/human-rights/feed/rss.xml',
  'https://news.un.org/ru/tags/disabled/feed/rss.xml',
  'https://news.un.org/feed/subscribe/ru/tags/palestine/feed/rss.xml',
  'https://news.un.org/feed/subscribe/ru/tags/dprk/feed/rss.xml',
]

const seedSources = () => {
  sourcesUrl.forEach(async (sourceUrl) => {
    await prisma.source.create({
      data: {
        name: "test",
        rssFeedUrl: sourceUrl
      },
    })
  })
}
