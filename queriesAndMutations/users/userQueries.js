import { gql } from '@apollo/client';

// get user by id
// used in admin > EditUser
const SINGLE_USER_QUERY = gql`
    query($userId: ID){
        user(userId: $userId){
            id
            email
            items{
                id
                image
                tags{
                    id
                    name
                    slug
                }
                location{
                    id
                    name
                    slug
                    country{
                        id
                        name
                        countryCode
                    }
                }
                votes{
                    id
                }
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