import gql from "graphql-tag";

export const ACCEPT_TOS = gql`
  mutation login($sc_token: String!, $acceptTos: Boolean) {
    login(sc_token: $sc_token, acceptTos: $acceptTos) {
      name
      jwt
      hasAcceptedTos
    }
  }
`;

export const GET_LOGIN_TOKEN = gql`
  query login($sc_token: String!) {
    login(sc_token: $sc_token) {
      name
      jwt
      hasAcceptedTos
    }
  }
`;
