// this component fetches all the items for the single taxonomy item
// it also handles errors and loading state
// f.e. all item with tag 'test' or all items in location 'x'

import { useQuery } from "@apollo/client";
import { TAG_ITEMS_QUERY, LOCATION_ITEMS_QUERY, COUNTRY_ITEMS_QUERY } from "./SingleTaxonomyQueries";
import { perPage } from '../../config';

function SingleTaxonomyItems(props){ // props: type
    console.log('props data',props.data, props.data.locations[0].slug)
    // set up the correct query and variables
    const variables = {
        orderBy: props.orderBy,
        skip: props.page * perPage - perPage || 0,
    }
    let query;
    if(props.type == 'tag'){
        variables.tagSlug = props.data.tag.slug;
        query = TAG_ITEMS_QUERY;
    }
    if(props.type == 'location'){
        variables.locationSlug = props.data.locations[0].slug;
        variables.countryCode = props.data.locations[0].country.countryCode;
        query = LOCATION_ITEMS_QUERY;
    }
    if(props.type == 'country'){
        variables.countryCode = props.data.country.countryCode;
        query = COUNTRY_ITEMS_QUERY;
    }
    // make query
    const { loading, error, data } = useQuery(query, { variables });
    console.log('data',loading, error, data)

    return 'hello'
}

export default SingleTaxonomyItems;