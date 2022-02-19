import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
// import { request, gql } from "graphql-request";
import { useHistory } from "react-router-dom";
import { PostsContext } from "../Context";
import { Link } from "react-router-dom";

const userFeedsQuery = gql`
  query UserFeeds {
    userFeeds {
      id
      title
    }
  }
`;

const Home = () => {
  const history = useHistory();
  const context = React.useContext(PostsContext);


  const {data, error} = useQuery(userFeedsQuery);
  console.log('data, error: ', data, error);


  // useEffect(() => {
  //   const init = async () => {
  //     const result = await request("http://localhost:4000/", userFeedsQuery, {});
  //     console.log("result: ", result);
  //   };

  //   init();
  // }, []);

  React.useEffect(() => {
    console.log(context.user.id === "");
    if (!context.user.id) {
      history.push("/login");
    }
  }, [context, history]);

  return (
    <>
      <h3>Home</h3>
      Hello {context.user.name}. Your email is {context.user.email}
      <div>
        <Link to={`/user/${context.user.id}`}>My profile</Link>
      </div>
    </>
  );
};

export default Home;
