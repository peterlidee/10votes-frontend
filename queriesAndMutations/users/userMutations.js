import { gql } from '@apollo/client'

// createUser
const SIGNUP_MUTATION = gql`
    mutation($email: String!, $password: String!){
        signup(email: $email, password: $password){
            id
            email
        }
    }
`;

// updateUser
const REQUEST_RESET_MUTATION = gql`
    mutation($email: String!){
        requestReset(email: $email){
            message
        }
    }
`;
const RESET_MUTATION = gql`
    mutation($password: String!, $confirmPassword: String!, $resetToken: String!){
        resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken){
            id
        }
    }
`;

export { SIGNUP_MUTATION, RESET_MUTATION, REQUEST_RESET_MUTATION }