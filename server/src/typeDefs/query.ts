import { gql } from 'apollo-server'

export const query = gql`
  type Query {
    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
    user(userId: String!): User!
    sourcesCount: Int!
    me: User!
    userFeeds: [Feed]
  }
`
