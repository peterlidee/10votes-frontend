// this component fetches all the items for the single taxonomy item
// it also handles errors and loading state
// f.e. all item with tag 'test' or all items in location 'x'

import Link from "next/link";
import getQueriesAndVariables from '../../lib/getQueriesAndVariables';

import { useQuery } from "@apollo/client";
import { perPage } from '../../config';
import PropTypes from 'prop-types';

import Loader from "../snippets/Loader";
import Error from "../snippets/Error";
import NoData from "../snippets/NoData";
import Item from "../item/Item";

function SingleTaxonomyItems(props){ // props: type

    const { query, variables } = getQueriesAndVariables(props.type, "items", props.data);

    // add additional parameters to variables
    variables.orderBy = props.orderBy;
    variables.skip = props.page * perPage - perPage || 0;

    // make query
    const { loading, error, data, previousData } = useQuery(query, { 
        variables, 
        fetchPolicy: "cache-and-network",
    });

    console.log('items data',data)
    console.log('items previousData',previousData)

    if(loading && !previousData) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />

    if(previousData && !data){
        if(!previousData.items) return <NoData>No pictures to display.</NoData>
        if(previousData.items.length == 0 && props.page > 1) return <NoData>No more pictures to display.</NoData>
        if(previousData.items.length == 0) return <NoData>No pictures yet for this {props.type}. Maybe you would like to <Link href="/addapicture"><a>add one</a></Link>?</NoData>
        if(loading) return(
            <div className="grid-items">
                {previousData.items.map(item => 
                    <Item key={item.id} item={item} />
                )}
            </div>
        )
    }

    if(!data || !data.items) return <NoData>No pictures to display.</NoData>
    if(data.items.length == 0 && props.page > 1) return <NoData>No more pictures to display.</NoData>
    if(data.items.length == 0) return <NoData>No pictures yet for this {props.type}. Maybe you would like to <Link href="/addapicture"><a>add one</a></Link>?</NoData>

    return(
        <div className="grid-items">
            {data.items.map(item => 
                <Item key={item.id} item={item} />
            )}
        </div>
    )
}

SingleTaxonomyItems.propTypes = {
    type: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default SingleTaxonomyItems;