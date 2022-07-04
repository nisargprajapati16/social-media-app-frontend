import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import MyPopup from "../utils/MyPopup";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deleteFn] = useMutation(mutation, {
    variables: { postId, commentId },
    update: (proxy) => {
      setConfirmOpen(false);
      if (!commentId) {
        proxy.updateQuery({ query: FETCH_POSTS_QUERY }, (data) => ({
          getPosts: [...data.getPosts.filter((post) => post.id !== postId)],
        }));
      }
      callback && callback();
    },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete Comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          onClick={() => setConfirmOpen(true)}
          floated={"right"}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteFn}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default DeleteButton;
