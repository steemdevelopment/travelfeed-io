import gql from "graphql-tag";

export const GET_SUBLOCATIONS = gql`
  query location($country_code: String, $subdivision: String, $city: String) {
    location(
      country_code: $country_code
      subdivision: $subdivision
      city: $city
    ) {
      subdivision
      city
    }
  }
`;
