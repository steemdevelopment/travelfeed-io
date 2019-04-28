import gql from "graphql-tag";

export const CHANGE_SETTINGS = gql`
  mutation updatePreferences(
    $acceptTos: Boolean
    $defaultVoteWeight: Int
    $defaultCommentsVoteWeight: Int
    $showNSFW: Boolean
    $useTfBlacklist: Boolean
  ) {
    updatePreferences(
      acceptTos: $acceptTos
      defaultVoteWeight: $defaultVoteWeight
      defaultCommentsVoteWeight: $defaultCommentsVoteWeight
      showNSFW: $showNSFW
      useTfBlacklist: $useTfBlacklist
    ) {
      success
      message
    }
  }
`;

export const GET_SETTINGS = gql`
  query preferences {
    preferences {
      defaultVoteWeight
      defaultCommentsVoteWeight
      showNSFW
      useTfBlacklist
    }
  }
`;

export const GET_VOTE_WEIGHTS = gql`
  query preferences {
    preferences {
      defaultVoteWeight
      defaultCommentsVoteWeight
    }
  }
`;
