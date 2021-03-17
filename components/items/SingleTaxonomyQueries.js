// these are all the relevent queries to display all items for a single tag, location or country
// for each there's a taxonomy[slug] exists
// and a items where taxonomy[slug]

import {gql} from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment';
import { perPage } from '../../config';

const TAG_EXISTS_QUERY = gql`
    query TAG_EXISTS_QUERY($tagSlug: String!){
        tag( tagSlug: $tagSlug ){
            id
            name
            slug
        }
    }
`;

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

// for finding a location we use locationS query, 
// cause that is the only way we can also give it a countrycode as param
// we then call it locations[0]
const LOCATION_EXISTS_QUERY = gql`
    query LOCATION_EXISTS_QUERY($locationSlug: String!, $countryCode: String!){
        locations( locationSlug: $locationSlug, countryCode: $countryCode ){
            id
            name
            slug
            country{
                id
                name
                countryCode
            }
        }
    }
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
            id
            image
            largeImage
            votes{
                id
            }
            voteCount
            tags{
                id
                name
                slug
            }
            location{
                id
                name
                slug
                country{
                    id
                    name
                    countryCode
                }
            }
        }
    }
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
    TAG_EXISTS_QUERY,
    TAG_COUNT_QUERY,
    TAG_ITEMS_QUERY,
    LOCATION_EXISTS_QUERY,
    LOCATION_COUNT_QUERY,
    LOCATION_ITEMS_QUERY,
    COUNTRY_EXISTS_QUERY,
    COUNTRY_COUNT_QUERY,
    COUNTRY_ITEMS_QUERY
};