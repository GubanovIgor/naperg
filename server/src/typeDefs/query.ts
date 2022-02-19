import { gql } from 'apollo-server'

export const query = gql`
	enum CacheControlScope {
		PUBLIC
		PRIVATE
	}

	directive @cacheControl(
		maxAge: Int
		scope: CacheControlScope
		inheritMaxAge: Boolean
	) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Query {
    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
    user(userId: String!): User!
    sourcesCount: Int! @cacheControl(maxAge: 30)
    me: User!
		getHeadlines: [Article] @cacheControl(maxAge: 30)
  }
`
