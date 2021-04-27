// these are all the relevent queries to display all items for a single tag, location or country
// for each there's a taxonomy[slug] exists
// and a items where taxonomy[slug]

import {gql} from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment';
import { perPage } from '../../config';

const TAG_COUNT_QUERY = gql`
    query TAG_COUNT_QUERY($tagSlug: String!){
        itemsConnection( tagSlug: $tagSlug ){
            aggregate{
                count
            }
        }
    }
`;

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

const LOCATION_COUNT_QUERY = gql`
    query LOCATION_COUNT_QUERY($countryCode: String!, $locationSlug: String!){
        itemsConnection( locationSlug: $locationSlug, countryCode: $countryCode ){
            aggregate{
                count
            }
        }
    }
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

const COUNTRY_EXISTS_QUERY = gql`
    query COUNTRY_EXISTS_QUERY($countryCode: String!){
        country( countryCode: $countryCode ){
            id
            name
            countryCode
        }
    }
`;

const COUNTRY_COUNT_QUERY = gql`
    query COUNTRY_COUNT_QUERY($countryCode: String!){
        itemsConnection( countryCode: $countryCode ){
            aggregate{
                count
            }
        }
    }
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
    TAG_COUNT_QUERY,
    TAG_ITEMS_QUERY,
    LOCATION_COUNT_QUERY,
    LOCATION_ITEMS_QUERY,
    COUNTRY_EXISTS_QUERY,
    COUNTRY_COUNT_QUERY,
    COUNTRY_ITEMS_QUERY
};