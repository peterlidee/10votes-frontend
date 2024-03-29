import { useQuery } from '@apollo/client'
import { SINGLE_ITEM_QUERY } from '../../queriesAndMutations/items/itemQueries'

import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';
import Item from './Item';

import PropTypes from 'prop-types';

function SingleItem(props){
    if(!props.itemId) return <NoData>No such picture found.</NoData>
    const { error, loading, data } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { itemId: props.itemId }, 
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-only"
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data.item) return <NoData>No such picture found.</NoData>    
    return <Item item={data.item} single={true} />
}

SingleItem.propTypes = {
    itemId: PropTypes.string.isRequired,
};

export default SingleItem;