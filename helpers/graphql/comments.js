import gql from "graphql-tag";

export const commentQuery = gql`
  query posts($parent_id: Int, $offset: Int) {
    posts(parent_id: $parent_id, limit: 10, offset: $offset) {
      post_id
      author
      body
      created_at
      children
      permlink
      depth
    }
  }
`;
