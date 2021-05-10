import { gql } from '@apollo/client'

const CREATE_ITEM_MUTATION = gql`
    mutation(
        $image: String
        $largeImage: String
        $location: String
        $tags: [String!]!
    ){
        createItem(
            image: $image
            largeImage: $largeImage
            location: $location
            tags: $tags
        ){
            id
            location{
                id
                items{
                    id
                }
            }
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation(
        $id: ID!
        $location: String
        $newTagNames: [String]
        $oldTagNames: [String]
        $oldTagIds: [ID!]
    ){
        updateItem(
            id: $id
            location: $location
            newTagNames: $newTagNames
            oldTagNames: $oldTagNames
            oldTagIds: $oldTagIds
        ){
            id
        }
    }
`;

const DELETE_ITEM_MUTATION = gql`
    mutation($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

// TODO: why are we asking for location?

export { CREATE_ITEM_MUTATION, UPDATE_ITEM_MUTATION, DELETE_ITEM_MUTATION }