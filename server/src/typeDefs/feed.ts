import { gql } from 'apollo-server'

export const feed = gql`
  scalar DateTime
  type Feed {
    id: String!
    title: String!
    createdAt: DateTime!
    user: User
  }
	type FeedCreateInput {
    title: String!
    userId: String!
		sources: [String!]
  }
	type SourceFeedRelation {
		sourceId: String!
		feedId: String!
	}
`