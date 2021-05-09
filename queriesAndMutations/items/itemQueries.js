import { gql } from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../fragments/itemFragment'

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

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($itemId: ID!){
        item( itemId: $itemId ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

export { ITEMS_CONNECTION_QUERY, SINGLE_ITEM_QUERY }