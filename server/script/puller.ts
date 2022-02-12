import * as cron from 'cron'
import { request, gql } from 'graphql-request'


const mutation = gql`
  mutation Mutation($page: Int!) {
    refreshFeeds(page: $page)
  }
`

const querySourcesCount = gql`
  query Query {
    sourcesCount
  }
`

const fetchTheData = async () => {
  console.log('cron function executed')
  const { sourcesCount } = await request(`http://localhost:4000/`, querySourcesCount)
	console.log(sourcesCount, 'sourcesCount')
	const pageCount = Math.ceil(sourcesCount / 2)

  for (let i = 1; i <= pageCount; i++) {
    const res = await request(`http://localhost:4000/`, mutation, {
			page: i
		})
		console.log(res)
  }
}

async function main() {
  const cronUpd = new cron.CronJob('10 * * * * *', function () {
    fetchTheData()
  })

  cronUpd.start()
  console.log('CRON job is started')
}

// TODO:
// 1. When you use cron, what file do you change in order set up a cron job?
// 2. What would be the cron line you would add to run this script once a day? '0 30 12 * * 0-7'
// 3. And what about for once every 10 minutes?  '0 10 * * * *'

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
