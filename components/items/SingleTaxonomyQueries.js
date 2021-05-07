// these are all the relevent queries to display all items for a single tag, location or country
// for each there's a taxonomy[slug] exists
// and a items where taxonomy[slug]

import {gql} from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment';
import { perPage } from '../../config';



const TAG_ITEMS_QUERY = gql`
    query TAG_ITEMS_QUERY(
            $tagSlug: String!, 
            $orderBy: ItemOrderByInput, 
            $skip: Int = 0, 
            $first: Int = ${perPage}
        ){
        items(
            tagSlug: $tagSlug,
            orderBy: $orderBy,
            skip: $skip,
            first: $first
        ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

const LOCATION_ITEMS_QUERY = gql`
    query LOCATION_ITEMS_QUERY(
        $locationSlug: String!, 
        $countryCode: String!, 
        $orderBy: ItemOrderByInput, 
        $skip: Int = 0, 
        $first: Int = ${perPage}
    ){
        items(
            locationSlug:$locationSlug,
            countryCode: $countryCode,
            orderBy: $orderBy,
            skip: $skip,
            first: $first,
        ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

const COUNTRY_ITEMS_QUERY = gql`
    query COUNTRY_ITEMS_QUERY(
            $countryCode: String!, 
            $orderBy: ItemOrderByInput, 
            $skip: Int = 0, 
            $first: Int = ${perPage}
        ){
        items(
            countryCode: $countryCode,
            orderBy: $orderBy,
            skip: $skip,
            first: $first,
        ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

export { 
    TAG_ITEMS_QUERY,
    LOCATION_ITEMS_QUERY,
    COUNTRY_ITEMS_QUERY
};