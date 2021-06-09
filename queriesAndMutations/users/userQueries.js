import { gql } from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../fragments/itemFragment'

// get user by id
// used in admin > EditUser
const SINGLE_USER_QUERY = gql`
    query($userId: ID){
        user(userId: $userId){
            id
            email
            items{
                ...ItemFields
            }
            votes{
                id
                item{
                    id
                }
            }
            permissions
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
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

// used in user context
// no args cause it check cookie in request header
const USER_LOGGED_IN_QUERY = gql`
    query {
        me {
            id
            email
            permissions
        }
    }
`;

// TODO: remove email?

export { 
    SINGLE_USER_QUERY,
    USERS_QUERY,
    USER_LOGGED_IN_QUERY,
};