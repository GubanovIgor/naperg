import { gql } from 'apollo-server'

export const article = gql`
  type Article {
		id:           String!
		createdAt:    DateTime!
		updatedAt:    DateTime!
		sourceId:    String!
		author:       String
		title:        String!
		url:         String!
		content: String!
  }
`
