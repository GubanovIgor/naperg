import * as cron from 'cron'
import { request, gql } from 'graphql-request'

// FIXME: right query
const query = gql`
  {
    Movie(title: "Inception") {
      releaseDate
      actors {
        name
      }
    }
  }
`
// FIXME: right adress
const fetchTheData = () => {
  request('https://api.graph.cool/simple/v1/movies', query).then((data) =>
    console.log(data),
  )
}

async function main() {
  const cronUpd = new cron.CronJob('0 30 * * * *', function () {
    fetchTheData()
      .then((r) => {})
      .catch(() => {})
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
