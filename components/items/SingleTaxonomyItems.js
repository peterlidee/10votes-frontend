// this component fetches all the items for the single taxonomy item
// it also handles errors and loading state
// f.e. all item with tag 'test' or all items in location 'x'

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { TAG_ITEMS_QUERY, LOCATION_ITEMS_QUERY, COUNTRY_ITEMS_QUERY } from "./SingleTaxonomyQueries";
import { perPage } from '../../config';
import PropTypes from 'prop-types';

import Loader from "../snippets/Loader";
import NoData from "../snippets/NoData";
import Error from "../snippets/Error";

function SingleTaxonomyItems(props){ // props: type
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

    if(loading) return <Loader containerClass="items-loader" />
    if(error)   return <Error error={error} />
    if(!data || !data.items) return <NoData>No pictures to display.</NoData>
    if(data.items.length == 0 && props.page > 1) return <NoData>No more pictures to display.</NoData>
    if(data.items.length == 0) return <NoData>No pictures yet for this {props.type}. Maybe you would like to <Link href="/addapicture"><a>add one</a></Link>?</NoData>


    return 'hello'
}

SingleTaxonomyItems.propTypes = {
    type: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default SingleTaxonomyItems;