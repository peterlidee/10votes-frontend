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

const UPDATE_TAG_MUTATION = gql`
    mutation($newTagName: String!, $oldTagId: ID!){
        updateTag(newTagName: $newTagName, oldTagId: $oldTagId){            
            id
            name
            slug
        }
    }
`

const DELETE_TAG_MUTATION = gql`
    mutation($tagId: ID!){
        deleteTag(tagId: $tagId){
            id
            name
            slug
        }
    }
`;

export { CREATE_TAG_MUTATION, UPDATE_TAG_MUTATION, DELETE_TAG_MUTATION };