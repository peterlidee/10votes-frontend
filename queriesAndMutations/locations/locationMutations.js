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

const CREATE_LOCATION_MUTATION = gql`
    mutation($name: String!, $countryCode: String!){
        createLocation(name: $name, countryCode: $countryCode){
            ...LocationFields
        }
    }
    ${LOCATION_FIELDS_FRAGMENT}
`;

const UPDATE_LOCATION_MUTATION = gql`
    mutation($oldLocationId: ID!, $newLocationName: String!){
        updateLocation(oldLocationId: $oldLocationId, newLocationName: $newLocationName){
            ...LocationFields
        }
    }
    ${LOCATION_FIELDS_FRAGMENT}
`

const DELETE_LOCATION_MUTATION = gql`
    mutation($locationId: ID!){
        deleteLocation(locationId: $locationId){
            ...LocationFields
        }
    }
    ${LOCATION_FIELDS_FRAGMENT}
`;

export { CREATE_LOCATION_MUTATION, UPDATE_LOCATION_MUTATION, DELETE_LOCATION_MUTATION }  