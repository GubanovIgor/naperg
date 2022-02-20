import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { PostsContext } from "../Context";
import { TextField, Button } from "@material-ui/core/";
import { Link } from "react-router-dom";

const QUERY = gql`
  query Headlines {
    getHeadlines {
      title
      url
      content
    }
  }
`;

const userFeedsQuery = gql`
  query UserFeeds {
    userFeeds {
      id
      title
    }
  }
`;

const createFeedMutation = gql`
  mutation createFeed($title: String!) {
    createFeed(title: $title) {
      title
    }
  }
`;

const Home = () => {
  const history = useHistory();
  const context = React.useContext(PostsContext);
  const { data } = useQuery(QUERY);
  const userFeeds = useQuery(userFeedsQuery);
  const [newFeed, setNewFeed] = React.useState("");
  const [createFeed] = useMutation(createFeedMutation);

  React.useEffect(() => {
    if (!context.user.id) {
      history.push("/login");
    }
  }, [context, history]);

  const CreateNewFeed = async () => {
    await createFeed({
      variables: {
        title: newFeed,
      },
    });


  };

  const renderHeadlines = () => {
    if (!data?.getHeadlines.length) {
      return <div>There is no headlines yet.</div>;
    }

    return data?.getHeadlines.map((item: any) => {
      return (
        <div>
          {item.title}
          <br />
        </div>
      );
    });
  };

  const renderUserFeeds = () => {
    if (!userFeeds.data) {
      return <div>There is no feeds yet.</div>;
    }

    return userFeeds.data.userFeeds.map((userFeed) => {
      return <div key={userFeed.title}>{userFeed.title}</div>;
    });
  };

  return (
    <>
      <h3>Home</h3>
      Hello {context.user.name}. Your email is {context.user.email}
      <div>
        <TextField
          id="newFeed"
          label="newFeed"
          value={newFeed}
          onChange={(e) => setNewFeed(e.target.value)}
        />
        <div>
          <Button
            style={{ margin: "20px 0 20px 0" }}
            variant={"outlined"}
            color={"primary"}
            onClick={() => CreateNewFeed()}
          >
            Create New Feed
          </Button>
        </div>
      </div>
      <div>
        <h4>Headlines</h4>
        {renderHeadlines()}
      </div>
      <div>
        <h4>Feeds</h4>
        {renderUserFeeds()}
      </div>
      <div>
        <Link to={`/user/${context.user.id}`}>My profile</Link>
      </div>
    </>
  );
};

export default Home;
