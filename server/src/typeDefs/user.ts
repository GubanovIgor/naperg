import { gql } from 'apollo-server'

export const user = gql`
  scalar DateTime

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type User @cacheControl(maxAge: 60) {
    email: String!
    id: ID!
    name: String
    role: Role
    lastLogin: DateTime
    feed: [Feed]
  }
  enum Role {
    ADMIN
    USER
  }

  input UserWhereInput {
    search: String
    name: SearchObj
  }
  input SearchObj {
    contains: String
  }
  type UsersPagination {
    users: [User!]!
    count: Float!
    take: Float!
  }
  input UserUpdateInput {
    name: String
    role: Role
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UserCreateInput {
    email: String!
    password: String!
    name: String
  }
`
