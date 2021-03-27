import Link from 'next/link';
import PropTypes from 'prop-types';

import { useQuery, gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment';

import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';
import Item from './Item';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($itemId: ID!){
        item( itemId: $itemId ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

function SingleItem(props){
    if(!props.itemId) return <NoData>No such picture found.</NoData>
    const { error, loading, data } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { itemId: props.itemId },
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data.item) return <NoData>No such picture found.</NoData>
    return(
        <Item item={data.item} single={true} />
    )
}

SingleItem.propTypes = {
    itemId: PropTypes.string.isRequired,
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };