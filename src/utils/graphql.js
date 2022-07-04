import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
      likeCount
      likes {
        id
        username
      }
    }
  }
`;
