import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useForm } from "../utils/hooks";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update: (proxy, result) => {
      proxy.updateQuery({ query: FETCH_POSTS_QUERY }, (data) => ({
        getPosts: [result.data.createPost, ...data.getPosts],
      }));
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World..!!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={!!error}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ui className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ui>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
