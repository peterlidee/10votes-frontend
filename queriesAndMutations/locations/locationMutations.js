import { gql } from '@apollo/client';

const CREATE_LOCATION_MUTATION = gql`
    mutation($name: String!, $countryCode: String!){
        createLocation(name: $name, countryCode: $countryCode){
            id
            name
            slug
            country{
                id
                name
                countryCode
            }
        }
    }
`;

export { CREATE_LOCATION_MUTATION }  