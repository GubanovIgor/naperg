import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { PostsContext } from "../Context";
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

const Home = () => {
  const history = useHistory();
  const context = React.useContext(PostsContext);
	const { data } = useQuery(QUERY);

  React.useEffect(() => {
    console.log(context.user.id === "");
    if (!context.user.id) {
      history.push("/login");
    }
  }, [context]);

  return (
    <>
      <h3>Home</h3>
      Hello {context.user.name}. Your email is {context.user.email}
			<div>
				{data?.getHeadlines.map((item: any) => {
					return (
						<div>
							{item.title}
							<br />
						</div>
					)
				})}
			</div>
      <div>
        <Link to={`/user/${context.user.id}`}>My profile</Link>
      </div>
    </>
  );
};

export default Home;
