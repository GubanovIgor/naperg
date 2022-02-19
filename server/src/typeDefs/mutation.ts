import { gql } from 'apollo-server'

export const mutation = gql`
  type Mutation {
    signupUser(name: String!, email: String!, password: String!): AuthPayload!
    updateUser(data: UserUpdateInput!, userId: String!): User!
    loginUser(email: String!, password: String!): AuthPayload!
    forgetPassword(email: String!): Boolean!
    resetPassword(password: String!, resetPasswordToken: String!): AuthPayload!
    deleteUser(userId: String!): User!

    # TODO: Please write the implementation of this endpoint. It takes an
    # optional argument, which you may or may not use. Think about the different
    # use cases: the front end may want to refresh a specific feed when a user
    # visits it.
    #
    # (real documentation of this endpoint below)
    # Triggers a refresh to process a specific set of feeds.
    # If no feedIds are provided, it refreshes all feeds in the DB.
    # The return value of this endpoint is unused.
    #
    # https://stackoverflow.com/questions/44737043/is-it-possible-to-not-return-any-data-when-using-a-graphql-mutation
    refreshAllFeeds(feedIds: [String!], page: Int!): Int!
    refreshFeeds(feedIds: [String!], page: Int!): Int!
		addHeadlines: Boolean!
  }
`
