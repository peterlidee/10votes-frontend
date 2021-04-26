import { gql } from '@apollo/client';

const SEARCH_USERS_QUERY = gql`
    query SEARCH_USERS_QUERY($search: String!){
        users( emailContains: $search ){
            id
            email
        }
    }
`;

export { SEARCH_USERS_QUERY };