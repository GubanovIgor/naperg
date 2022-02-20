import { Item } from 'rss-parser'
import { Context } from '../model/appInterface'
import { Prisma, PrismaClient, Source } from '@prisma/client'
import * as Parser from 'rss-parser'
import utils from '../utils'

const parser = new Parser()
type PrismaDB = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>

const SOURCE_STALENESS_MINUTES = 10
const PAGE_SIZE = 2

export const rssMutationResolvers = {
  refreshFeeds: async (parent, args, ctx: Context) => {
    const { prisma } = ctx
    const { feedIds } = args

    let feeds = await prisma.feed.findMany({
      where: {
        id: { in: feedIds },
      },
      include: {
        sources: true,
      },
    })
    let staleSources: Source[] = feeds.map((feed) => feed.sources).flat()

    return updateSourcesArticles(prisma, staleSources)
  },

  refreshAllFeeds: async (parent, args, ctx: Context) => {
    const { page } = args
    const { prisma } = ctx

    let staleSources: Source[] = await prisma.source.findMany({
      skip: PAGE_SIZE * (page - 1),
      take: PAGE_SIZE,
    })

    return updateSourcesArticles(prisma, staleSources)
  },

  createFeed: async (parent, args, ctx: Context) => {
    const userId = utils.getUserId(ctx)
    const user = await ctx.prisma.user.findUnique({ where: { id: userId } })
    const { title } = args

    if (!user) throw new Error('Not Auth')

    const feed = await ctx.prisma.feed.create({
      data: {
        title: title,
        owner: {
          connect: { id: userId },
        },
      },
    })
    return feed
  },
}

function shouldUpdate(date: Date | null) {
  if (!date) {
    return true
  }

  const cutOff = Date.now() - 1000 * 60 * SOURCE_STALENESS_MINUTES

  return new Date(date).getTime() < cutOff
}

function createArticle(prisma: PrismaDB, article: Item, source: Source) {
  return prisma.article.create({
    data: {
      title: article.title || '',
      url: article.link || '',
      content: article.content || '',
      author: article.creator || '',
      sourceId: source.id,
    },
  })
}

async function updateSourcesArticles(prisma: PrismaDB, sources: Source[]) {
  let sourceToUpdate = sources.filter((source) =>
    shouldUpdate(source.lastRefreshedAt),
  )

  let counter = 0 // counter for new articles that added to DB
  const articles = await prisma.article.findMany()
  const articlesHash = articles.reduce(
    (hash: { [key: string]: boolean }, article) => {
      // hash table that helps to check if article is already exist
      hash[article.title] = true
      return hash
    },
    {},
  )

  for (let i = 0; i < sourceToUpdate.length; i++) {
    const source = sourceToUpdate[i]
    const parsedResult = await parseRssFeed(sourceToUpdate[i])
    await prisma.source.update({
      where: {
        id: sourceToUpdate[i].id,
      },
      data: {
        lastRefreshedAt: new Date(),
      },
    })

    for (let i = 0; i < parsedResult.length; i++) {
      const article = parsedResult[i]
      const articleExist = articlesHash[article.title || 'N/A']

      if (!articleExist) {
        await createArticle(prisma, article, source)
        counter++
      }
    }
  }

  return counter
}

const parseRssFeed = async (source: Source): Promise<Item[]> => {
  // TODO: Add error handling
  const parsedSource = await parser.parseURL(source.rssFeedUrl)
  return parsedSource.items
}
