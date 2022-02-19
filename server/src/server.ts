import { ApolloServer } from 'apollo-server'
import { resolvers } from './schema'
import { createContext } from './context'
import { makeExecutableSchema } from 'graphql-tools'
import { query } from './typeDefs/query'
import { user } from './typeDefs/user'
import { feed } from './typeDefs/feed'
import { mutation } from './typeDefs/mutation'
import responseCachePlugin from 'apollo-server-plugin-response-cache'

const schema = makeExecutableSchema({
  typeDefs: [query, user, mutation, feed],
  resolvers,
})

new ApolloServer({
  schema,
  context: createContext,
  plugins: [
    responseCachePlugin({
      sessionId: (requestContext: any) =>
        requestContext.request.http.headers.get('token') || null,
    }),
  ],
}).listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000 ⭐️⭐️⭐️⭐️`),
)
