import { gql } from '@apollo/client'

// createUser
const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $password: String!){
        signup(email: $email, password: $password){
            id
            email
        }
    }
`;

export { SIGNUP_MUTATION }