// in the <Pagination> and <OrderItems> components, we need a pathname and query
// f.e. pathname: "/location/[countryCode]/[locationSlug]"
// f.e. query: { countrycode: "be", locationSlug: "gent" }
// ( later, the query will be extended with f.e. orderBy or page parameters in the orderItems component )
// this then gets called as such in there components:
// <Link href={{ pathname: pathname, query: { ...query, anotherKey: value } }}> ...

// parameters: type (locations, tags, country), data ( f.e. data.tag = { id, name, slug } )
// response = { pathname, query }

const pathnames = {
    tags: '/tags/[tagSlug]',
    locations: '/location/[countryCode]/[locationSlug]',
    country: '/location/[countryCode]',
}

export default function getPaths(type, data){

    const response = {}
    // select the pathname
    response.pathname = pathnames[type];

    // construct the query
    response.query = {}

    if(type == "tags"){
        // /tags/[tagSlug]
        response.query.tagSlug = data.tag.slug;
    }
    if(type == "locations"){
        // /location/[countryCode]/[locationSlug]
        response.query.locationSlug = data.locations[0].slug;
        response.query.countryCode = data.locations[0].country.countryCode;
    }
    if(type == "country"){
        // /location/[countryCode]
        response.query.countryCode = data.country.countryCode;
    }
    return response;
}