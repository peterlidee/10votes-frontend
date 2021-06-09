import { gql } from '@apollo/client';

const LOCATION_FIELDS_FRAGMENT =  gql`
    fragment LocationFields on Location{
        id
        name
        slug
        country{
            id
            name
            countryCode
        }
    }
`;

export default LOCATION_FIELDS_FRAGMENT;