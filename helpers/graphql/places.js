import gql from "graphql-tag";

export const GET_PLACES = gql`
  query places {
    places {
      author
      permlink
      title
      latitude
      longitude
    }
  }
`;
