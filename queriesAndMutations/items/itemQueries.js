import { gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../fragments/itemFragment'
import { perPage } from '../../config'

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
    query($itemId: ID!){
        item( itemId: $itemId ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

const ITEMS_QUERY = gql`
    query(
            $tagSlug: String,
            $locationSlug: String, 
            $countryCode: String, 
            $orderBy: ItemOrderByInput, 
            $skip: Int = 0, 
            $first: Int = ${perPage}
        ){
        items(
            tagSlug: $tagSlug,
            locationSlug:$locationSlug,
            countryCode: $countryCode,
            orderBy: $orderBy,
            skip: $skip,
            first: $first
        ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

// query all items from current user
// this does NOT call items but a seperate userItems in the backend
// because it gets the items of the current user
// which is determined by a cookie sent along with the request
const USER_ITEMS_QUERY = gql`
    query{
        userItems{
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

// query items that match [ID]
// used in admin EditTaxonomy for user (the items the user voted for)
const ITEMS_BY_IDS = gql`
    query($ids: [ID!]!){
        itemsByIds(ids: $ids){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

export { ITEMS_CONNECTION_QUERY, SINGLE_ITEM_QUERY, ITEMS_QUERY, USER_ITEMS_QUERY, ITEMS_BY_IDS }