import { gql } from '@apollo/client';

// itemsConnection queries
const ITEMS_CONNECTION_QUERY = gql`
    query (
        $tagId: ID
        $tagSlug: String
        $locationId: ID
        $locationSlug: String
        $countryId: ID
        $countryCode: String
    ){
        itemsConnection( 
            tagId: $tagId 
            tagSlug: $tagSlug
            locationId: $locationId
            locationSlug: $locationSlug
            countryId: $countryId
            countryCode: $countryCode
        ){
            aggregate{
                count
            }
        }
    }
`;

export { ITEMS_CONNECTION_QUERY }