import React from "react";
import { Button } from "@material-ui/core/";
import { gql, useMutation, useApolloClient } from "@apollo/client";

const MUTATION = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      id
    }
  }
`;

interface Props {
  userId: string;
}
const DeleteUser = (props: Props) => {
  const client = useApolloClient();
  const [message, setMessage] = React.useState("");

  const [deleteUser] = useMutation(MUTATION);

  const deleteUserF = async () => {
    let dataUser;
    try {
      dataUser = await deleteUser({
        variables: {
          userId: props.userId,
        },
      });
    } catch (e: any) {
      e.graphQLErrors.some((graphQLError: any) =>
        setMessage(graphQLError.message)
      );
    }
    if (dataUser?.data?.deleteUser) {
      setMessage("");
      client.resetStore();
    }
  };

  return (
    <>
      <Button variant={"outlined"} color={"primary"} onClick={deleteUserF}>
        x
      </Button>
      <div className="secondary">{message}</div>
    </>
  );
};
export default DeleteUser;
