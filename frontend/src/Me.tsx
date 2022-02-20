import React from "react"
import { gql, useQuery } from "@apollo/client"
import { PostsContext } from "./Context"
export const QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`

export default function Me() {
  const { data } = useQuery(QUERY)
  const context = React.useContext(PostsContext)

  React.useEffect(() => {
    console.log("me")
    if (data?.me?.id) {
      context.updateUser(data.me)
    }
  }, [data, context])

  return null
}
