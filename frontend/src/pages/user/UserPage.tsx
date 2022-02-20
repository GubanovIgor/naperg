import React from "react";
import { useParams } from "react-router";
import { User } from "./User.type";
// import { Button } from "@material-ui/core/";
import { gql, useQuery } from "@apollo/client";
import { ParamTypes } from "../../ParamTypes.type";
import { Button } from "@material-ui/core";
import EditUser from "./EditUser";

export const QUERY = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id
      name
      email
      role
      lastLogin
    }
  }
`;

export const HEADLINES = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id
      name
      email
      role
      lastLogin
    }
  }
`;

const UserPage = () => {
  const params: ParamTypes = useParams<ParamTypes>();
  const userId = params.userId;
  const [editMode, setEditMode] = React.useState(false);
  const { data } = useQuery(QUERY, {
    variables: {
      userId,
    },
  });

  if (!data?.user) return null;
  const user: User = data.user;
  return (
    <div>
      <h3>User</h3>

      {editMode ? (
        <>
          <EditUser
            user={user}
            onUpdate={() => setEditMode(false)}
            onCancel={() => setEditMode(false)}
          />
        </>
      ) : (
        <>
          <div style={{ textAlign: "right" }}>
            <Button variant="outlined" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </div>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
          <div>
            Last Login:{" "}
            {user.lastLogin &&
              new Date(user.lastLogin).toLocaleDateString("en-US")}
          </div>
        </>
      )}
    </div>
  );
};
export default UserPage;