import { gql } from '@apollo/client';

const USERS_QUERY = gql`
    query($emailContains: String!){
        users( emailContains: $emailContains ){
            id
            email
        }
    }
`;

export { USERS_QUERY };