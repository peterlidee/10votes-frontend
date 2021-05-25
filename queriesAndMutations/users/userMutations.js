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

// updateUser
const RESET_MUTATION = gql`
    mutation($password: String!, $confirmPassword: String!, $resetToken: String!){
        resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken){
            id
        }
    }
`;

//login
const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            id
            email
        }
    }
`;

//logout
const LOGOUT_MUTATION = gql`
    mutation{
        logout{
            message
        }
    }
`;

// update permissions
const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation($admin: Boolean!, $userId: ID!){
        updatePermissions(admin: $admin, userId: $userId){
            id
            permissions
        }
    }
`;

export { SIGNUP_MUTATION, RESET_MUTATION, REQUEST_RESET_MUTATION, LOGIN_MUTATION, LOGOUT_MUTATION, UPDATE_PERMISSIONS_MUTATION }