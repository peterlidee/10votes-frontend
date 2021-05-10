import { gql } from '@apollo/client'

const CREATE_TAG_MUTATION = gql`
    mutation($name: String!){
        createTag(name: $name){
            id
            name
            slug
        }
    }
`;

export { CREATE_TAG_MUTATION };