/**
 * Contains resolvers related to refreshing RSS feeds.
 *
 * This would be an example of separating resolvers more cleanly into separate
 * files. Note that there are many ways to do this, depending on how large your
 * app is.
 */
import { Context } from "../model/appInterface";
import { Source } from '@prisma/client'
import * as Parser from 'rss-parser';
const parser = new Parser();


// This is the number, in minutes, before a source is considered "stale" and
// needs to be refreshed. That is, if a source has not been refreshed in the last
// N minutes, it should be refreshed.
//
// You may change this value if you want for testing. You can even change it to
// seconds.
//
// Please note the avoidance of magic numbers.
// https://en.wikipedia.org/wiki/Magic_number_(programming)
const SOURCE_STALENESS_MINUTES = 10;

export const rssMutationResolvers = {
  refreshFeeds: async (parent, args, ctx: Context) => {
		const { prisma } = ctx
    let staleSources : Source[] = await prisma.source.findMany();
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

/**
 * A type used only internally in this file for parsing an article from an RSS
 * feed.
 */
 import { Item } from 'rss-parser'

/**
 * Returns a **list** of objects representing articles for the given RSS feed.
 *
 * Optional: You may want this to take "SOURCE_STALENESS_MINUTES" too, so you
 * can filter out articles that don't need to be refreshed. Think about how you
 * might be adding duplicate articles on accident.
 */
const parseRssFeed = async (source: Source): Promise<Item[]> => {
  // TODO: Use the RSS parser here. This has been separated into its own
  // function for cleanliness.
	const parsedSource = await parser.parseURL(source.rssFeedUrl)
	return parsedSource.items
};
