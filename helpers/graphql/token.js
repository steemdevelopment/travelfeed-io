import gql from "graphql-tag";

export const GET_LOGIN_TOKEN = gql`
  query login($sc_token: String!) {
    login(sc_token: $sc_token) {
      name
      jwt
    }
  }
`;
