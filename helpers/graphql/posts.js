import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts(
    $country_code: [String]
    $subdivision: String
    $city: String
    $suburb: String
    $location_box: [Float]
    $author: String
    $feed: String
    $tags: [String]
    $parent_id: Int
    $is_comment: Boolean
    $min_curation_score: Int
    $min_total_votes: Int
    $include_nsfw: Boolean
    $include_hidden: Boolean
    $orderby: String
    $orderdir: String
    $offset: Int
    $limit: Int
  ) {
    posts(
      country_code: $country_code
      subdivision: $subdivision
      city: $city
      suburb: $suburb
      location_box: $location_box
      author: $author
      feed: $feed
      tags: $tags
      parent_id: $parent_id
      is_comment: $is_comment
      min_curation_score: $min_curation_score
      min_total_votes: $min_total_votes
      include_nsfw: $include_nsfw
      include_hidden: $include_hidden
      orderby: $orderby
      orderdir: $orderdir
      offset: $offset
      limit: $limit
    ) {
      author
      permlink
      title
      img_url
      votes
    }
  }
`;
