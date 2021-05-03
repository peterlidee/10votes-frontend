import { gql } from '@apollo/client';

// get user by id
// used in admin > EditUser
const SINGLE_USER_QUERY = gql`
    query($userId: ID){
        user(userId: $userId){
            id
            items{
                id
            }
            votes{
                id
            }
            permissions
        }
    }
`;

// used in inputSuggestion (admin dash)
const USERS_QUERY = gql`
    query($emailContains: String!){
        users( emailContains: $emailContains ){
            id
            email
        }
    }
`;

export { 
    SINGLE_USER_QUERY,
    USERS_QUERY,
};