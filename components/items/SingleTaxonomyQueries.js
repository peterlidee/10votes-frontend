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

const ITEMS_WITH_TAG_QUERY = gql`
    query ITEMS_WITH_TAG_QUERY($tagSlug: String!, $orderBy: ItemOrderByInput, $skip: Int = 0, $first: Int = ${perPage}){
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

const COUNTRY_EXISTS_QUERY = gql`
    query COUNTRY_EXISTS_QUERY($countryCode: String!){
        country( countryCode: $countryCode ){
            id
            name
            countryCode
        }
    }
`;

export { TAG_EXISTS_QUERY, ITEMS_WITH_TAG_QUERY, LOCATION_EXISTS_QUERY, COUNTRY_EXISTS_QUERY };