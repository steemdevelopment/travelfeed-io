import gql from "graphql-tag";

export const GET_SHORT_PROFILE = gql`
  query profile($author: String!) {
    profile(username: $author) {
      name
      display_name
      about
      isCurator
      isFollowed
      isIgnored
    }
  }
`;

export const GET_PROFILE = gql`
  query profile($author: String!) {
    profile(username: $author) {
      name
      display_name
      profile_image
      about
      isCurator
      location
      website
      twitter
      facebook
      instagram
      youtube
      couchsurfing
      cover_image
      followers
      following
      isBlacklisted
      isFollowed
      isIgnored
    }
  }
`;
