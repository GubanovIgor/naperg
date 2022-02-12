import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: `admin@naperg.com`,
  //     name: 'Admin Naperg',
  //     password: await bcrypt.hash('admin', 10),
  //     role: 'ADMIN',
  //     resetPasswordToken: '123',
  //     validateEmailToken: '',
  //     isEmailValidated: true,
  //   },
  // })

	const sourcesUrl = [
		'https://news.un.org/feed/subscribe/ru/tags/un/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/nafrica/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/un-affairs/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/humanitarian-aid/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/women/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/health/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/climate-change/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/pbc/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/culture-and-education/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/sdgs/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/law-and-crime-prevention/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/migrants-and-refugees/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/peace-and-security/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/piracy/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/palestine/feed/rss.xml',
		'https://news.un.org/ru/tags/disabled/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/human-rights/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/food/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/disarmament/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/fincrisis/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/news/topic/economic-development/feed/rss.xml',
		'https://news.un.org/feed/subscribe/ru/tags/dprk/feed/rss.xml'
	]

	sourcesUrl.forEach(async (sourceUrl) => {
    await prisma.source.create({
      data: {
        name: "test",
        rssFeedUrl: sourceUrl
      },
    })
  })
  // seedSources()

  // TODO: Insert some sources here.

  // console.log({ user })
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
	'https://news.un.org/feed/subscribe/ru/tags/un/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/nafrica/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/un-affairs/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/humanitarian-aid/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/women/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/health/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/climate-change/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/pbc/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/culture-and-education/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/sdgs/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/law-and-crime-prevention/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/migrants-and-refugees/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/peace-and-security/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/piracy/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/palestine/feed/rss.xml',
	'https://news.un.org/ru/tags/disabled/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/human-rights/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/food/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/disarmament/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/fincrisis/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/news/topic/economic-development/feed/rss.xml',
	'https://news.un.org/feed/subscribe/ru/tags/dprk/feed/rss.xml'
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
