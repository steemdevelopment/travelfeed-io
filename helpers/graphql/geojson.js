/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_GEOJSON = gql`
  query geojson($countryList: [String]!) {
    geojson(countryList: $countryList) {
      features
    }
  }
`;
