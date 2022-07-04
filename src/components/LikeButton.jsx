import { useState, useEffect, useContext } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import MyPopup from "../utils/MyPopup";

const LikeButton = ({ post: { id, likeCount, likes } }) => {
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const likeButtonExt = user ? (
    <Button color="teal" basic={!liked}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? "Unlike" : "Like"}>{likeButtonExt}</MyPopup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
