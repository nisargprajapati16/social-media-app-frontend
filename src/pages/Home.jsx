import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { useMemo } from "react";
import { Grid, GridColumn, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  const posts = useMemo(() => {
    return data?.getPosts || [];
  }, [data]);

  return (
    <Grid columns="three" divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <GridColumn>
            <PostForm />
          </GridColumn>
        )}
        {loading ? (
          <h1>Loading posts....</h1>
        ) : (
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column
                key={post.id}
                style={{ marginBottom: 20, boxShadow: "unset" }}
              >
                <PostCard {...post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
