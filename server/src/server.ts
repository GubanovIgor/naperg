import { ApolloServer } from 'apollo-server'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { resolvers } from './schema'
import { createContext } from './context'
import { makeExecutableSchema } from 'graphql-tools'
import { query } from './typeDefs/query'
import { user } from './typeDefs/user'
import { article } from './typeDefs/article'
import { mutation } from './typeDefs/mutation'
const schema = makeExecutableSchema({
  typeDefs: [query, user, article, mutation],
  resolvers,
})

new ApolloServer({ schema, context: createContext, plugins: [responseCachePlugin()] }).listen(
  { port: 4000 },
  () => console.log(`🚀 Server ready at: http://localhost:4000 ⭐️⭐️⭐️⭐️`),
)
