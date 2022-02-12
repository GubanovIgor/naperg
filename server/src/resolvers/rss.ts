
import { Item } from 'rss-parser'
import { Context } from "../model/appInterface";
import { Source } from '@prisma/client'
import * as Parser from 'rss-parser';
const parser = new Parser();

const SOURCE_STALENESS_MINUTES = 10;

export const rssMutationResolvers = {
  refreshFeeds: async (parent, args, ctx: Context) => {
		const { page } = args
		console.log(page, 'page')

		const { prisma } = ctx
    let staleSources : Source[] = await prisma.source.findMany({
			skip: 2 * (page - 1),
			take: 2
		});
		staleSources = staleSources.filter((source) => shouldUpdate(source.lastRefreshedAt))

		let counter = 0 // counter for new articles that added to DB
		const articles = await prisma.article.findMany()
		const articlesHash = articles.reduce((hash, article) => {
			hash[article.title] = true
			return hash
		}, {})

    for (let i = 0; i < staleSources.length; i++) {
			const source = staleSources[i]
      const parsedResult = await parseRssFeed(staleSources[i])
			await prisma.source.update({
				where: {
					id: staleSources[i].id
				},
				data: {
					lastRefreshedAt: new Date()
				}
			})

			for (let i = 0; i < parsedResult.length; i++) {
				const article = parsedResult[i]
				const articleExist = articlesHash[article.title || 'N/A']

				if(!articleExist) {
					await createArticle(prisma, article, source)
					counter++
				}
			}
    }
		return counter

    // TODO: How do you test this resolver? What gets mocked? You don't need to
    // actually write the tests, but think about how you would do this. Write
    // your response below.
  },
};

function shouldUpdate(date: Date | null) {
	if (!date) {
		return true
	}

	const cutOff = Date.now() - 1000 * 60 * SOURCE_STALENESS_MINUTES;
	return new Date(date).getTime() < cutOff
}

function createArticle(prisma, article: Item, source: Source) {
	return prisma.article.create({
		data: {
			title: article.title || '',
			url: article.link || '',
			content: article.content || '',
			author: article.creator || '',
			sourceId: source.id
		}
	})
}




const parseRssFeed = async (source: Source): Promise<Item[]> => {
  // TODO: Add error handling
	const parsedSource = await parser.parseURL(source.rssFeedUrl)
	return parsedSource.items
};
