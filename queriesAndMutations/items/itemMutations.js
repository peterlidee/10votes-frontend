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

// TODO: why are we asking for location?

export { CREATE_ITEM_MUTATION }