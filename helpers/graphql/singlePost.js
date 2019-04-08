import gql from "graphql-tag";

export const GET_POSTS = gql`
  query post($author: String!, $permlink: String!) {
    post(author: $author, permlink: $permlink) {
      post_id
      author
      permlink
      category
      total_votes
      title
      preview
      img_url
      created_at
      is_travelfeed
      curation_score
      latitude
      longitude
      country_code
      subdivision
      city
      suburb
      body
      raw_json
      app
      tags
      children
      depth
    }
  }
`;
