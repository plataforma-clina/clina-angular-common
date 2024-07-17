import { gql } from 'apollo-angular';

export const CLINIC_LOCATIONS_QUERY = gql`
  query {
    clinicLocations {
      state
      cities {
        city
        neighborhoods
      }
    }
  }
`;
