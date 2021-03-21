// depending on the taxonomy type (tag, location or country)
// we need different data, f.e. queries, paths or input
// we need this info in different locations, so
// we bundled it all here, in one function

/* 
getQueriesVariablesPathsFromType(request, data){}
request = { 
    taxonomyType: tag, location, country !
    queryType: gqlQuery, linkQuery !
    gqlType: exists, count, items
}
data 1 = {
    data
}
data 2 = {
    [taxonomyType]slug: value
}

gql response = {
    query: QUERY
    variables: { [taxonomyType]slug: dataSlug }
}
link response = {
    pathname: path ()
    query: [taxonomyType]slug: value
}
*/

import {    TAG_EXISTS_QUERY, TAG_COUNT_QUERY, TAG_ITEMS_QUERY,
            LOCATION_EXISTS_QUERY, LOCATION_COUNT_QUERY, LOCATION_ITEMS_QUERY,
            COUNTRY_EXISTS_QUERY, COUNTRY_COUNT_QUERY, COUNTRY_ITEMS_QUERY 
} from "../components/items/SingleTaxonomyQueries";



function getQueriesVariablesPathsFromType(request, data){

    //console.log('getQueriesVariablesPathsFromType request', request)
    //console.log('getQueriesVariablesPathsFromType data', data)

    const queries = {
        tag: {
            exists: TAG_EXISTS_QUERY,
            count:  TAG_COUNT_QUERY,
            items:  TAG_ITEMS_QUERY,
        },
        location: {
            exists: LOCATION_EXISTS_QUERY,
            count:  LOCATION_COUNT_QUERY,
            items:  LOCATION_ITEMS_QUERY,
        },
        country: {
            exists: COUNTRY_EXISTS_QUERY,
            count:  COUNTRY_COUNT_QUERY,
            items:  COUNTRY_ITEMS_QUERY,
        },
    }

    const pathnames = {
        tag: '/tags/[tagSlug]',
        location: '/location/[countryCode]/[locationSlug]',
        country: '/location/[countryCode]',
    }

    const response = {}

    // for gql queries:
    if(request.queryType == 'queryRequest'){
        // select the gql query
        response.query = queries[request.taxonomyType][request.gqlType];

        // construct the correct variables
        response.variables = {}
        if(request.taxonomyType == 'tag'){
            // the exists query takes tagSlug from url, not from a query
            response.variables.tagSlug = request.gqlType == 'exists' ? data.tagSlug : data.tag.slug;
        }
        if(request.taxonomyType == 'location'){
            // the exists query takes locationSlug and countryCode from url, not from a query
            response.variables.locationSlug = request.gqlType == 'exists' ? data.locationSlug : data.locations[0].slug;
            response.variables.countryCode = request.gqlType == 'exists' ? data.countryCode : data.locations[0].country.countryCode;
        }
        if(request.taxonomyType == 'country'){
            // the exists query takes countryCode from url, not from a query
            response.variables.countryCode = request.gqlType == 'exists' ? data.countryCode : data.country.countryCode;
        }
    }
    
    // for link requests
    if(request.queryType == 'linkQuery'){
        // add pathname
        response.pathname = pathnames[request.taxonomyType];
        // construct the correct corresponding query
        response.query = {}

        if(request.taxonomyType == "tag"){
            // hrefPath = "/tags/[tagSlug]";
            response.query.tagSlug = data.tag.slug;
        }
        if(request.taxonomyType == "location"){
            // hrefPath = "/location/[countryCode]/[locationSlug]";
            response.query.locationSlug = data.locations[0].slug;
            response.query.countryCode = data.locations[0].country.countryCode;
        }
        if(request.taxonomyType == "country"){
            // hrefPath = "/location/[countryCode]";
            response.query.countryCode = data.country.countryCode;
        }

    }

    return response;

}

export default getQueriesVariablesPathsFromType;