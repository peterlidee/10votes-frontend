// some components can handle queries to different taxonomies
// f.e. get all items 1. with a certain tag or 2. in a certain location
// the component is the same but the query differs
// instead of importing all those queries we use this function
// it selects the query
// and also handles variables that get sent along with queries

// it's ugly but this way we don't need to do it in all the other components

/*
params:
1. type: the taxonomy we want: tags, locations, users, country !required
2. request: what are we querying?
    a. single: an instance of the taxonomy
    b. connection: the number of items in a taxonomy instance
    b. items: all the items in a certain taxonomy instance
    !required
3. data: can be 
    a. the response of a graphql query, f.e. data.tag -> { id name slug }
    b. a contructed object f.e. { tagSlug: "test", locationSlug: "", countrycode: "" } or { tagId: "", locationId: "", userId: "123" }
*/

/*
response: { query, variables }
*/

import { SINGLE_TAG_QUERY } from '../queriesAndMutations/tags/tagQueries'
import { LOCATIONS_QUERY, SINGLE_LOCATION_QUERY } from '../queriesAndMutations/locations/locationQueries'
import { SINGLE_USER_QUERY } from '../queriesAndMutations/users/userQueries'
import { SINGLE_COUNTRY_QUERY } from '../queriesAndMutations/countries/countryQueries'
import { ITEMS_CONNECTION_QUERY, ITEMS_QUERY } from '../queriesAndMutations/items/itemQueries'

const queries = {
    tags: {
        exists: SINGLE_TAG_QUERY,
        single: SINGLE_TAG_QUERY,
        connection: ITEMS_CONNECTION_QUERY,
        items:  ITEMS_QUERY,
    },
    locations: {
        exists: LOCATIONS_QUERY, // query to locationS, not location
        single: SINGLE_LOCATION_QUERY,
        connection: ITEMS_CONNECTION_QUERY,
        items: ITEMS_QUERY,
    },
    country: {
        exists: SINGLE_COUNTRY_QUERY,
        single: SINGLE_COUNTRY_QUERY,
        connection: ITEMS_CONNECTION_QUERY,
        items:  ITEMS_QUERY,
    },
    users: {
        single: SINGLE_USER_QUERY,
    }
}

export default function getQueriesAndVariablesFromType(type, request, data){
    const response = {
        // select the correct query
        query: queries[type][request],
    }

    // construct the correct variables
    const variables = {}
    
    // tags: id or slug
    if(data.tagId){
        variables.tagId = data.tagId;
    }else if(data.tagSlug){
        variables.tagSlug = data.tagSlug;
    }else if(data.tag){ // data was a graphQL query response
        variables.tagSlug = data.tag.slug;
    }

    // locations: id or slug
    if(data.locationId) {
        variables.locationId = data.locationId;
    }else{ // we don't need countryCode if it was an locationId
        if(data.locationSlug){
            variables.locationSlug = data.locationSlug;
            variables.countryCode = data.countryCode;
        // carefull here, for a single location exists query, we query locationS, not location
        }else if(data.locations){ 
            // data was a graphQL query response
            variables.locationSlug = data.locations[0].slug;
            variables.countryCode = data.locations[0].country.countryCode;
        }else if(data.location){ // for single location we use location, not locationS
            variables.locationSlug = data.location.slug;
            variables.countryCode = data.location.country.countryCode;
        }
    }

    //country: id or slug
    if(data.countryId){
        variables.countryId = data.countryId;
    }else{
        // check for type cause countryCode might be there for location aswell
        if(data.countryCode && type == "country"){ 
            variables.countryCode = data.countryCode;
        }else if(data.country){ // data was a graphQL query response
            variables.countryCode = data.country.countryCode;
        }
    }

    // user
    if(data.userId) variables.userId = data.userId;

    response.variables = variables;
    return response;

}