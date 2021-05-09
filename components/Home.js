import { useQuery, gql } from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../queriesAndMutations/fragments/itemFragment'
import { perPage } from '../config';

import MetaTitle from './snippets/MetaTitle';
import Loader from './snippets/Loader';
import Error from './snippets/Error';
import NoData from './snippets/NoData';
import Item from './item/Item';

// we do add first param here cause we may want a different number then perPage
const RECENT_ITEMS_QUERY = gql`
    query RECENT_ITEMS_QUERY($orderBy: ItemOrderByInput = createdAt_DESC, $first: Int = ${perPage}){
        items(orderBy: $orderBy, first: $first){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

const MOST_VOTED_ITEMS_QUERY = gql`
    query MOST_VOTED_ITEMS_QUERY($orderBy: ItemOrderByInput = voteCount_DESC, $first: Int = ${perPage}){
        items(orderBy: $orderBy, first: $first){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

function DisplayHomeItemsWrap(props){
    return(
        <section>
            <h1 className="title title--large">{props.title}</h1>
            <DisplayHomeItems query={props.query} />
        </section>
    );
}

function DisplayHomeItems(props){
    const { loading, error, data } = useQuery(props.query);
    if(loading) return <Loader containerClass="items-loader" />;                
    if(error) return <Error error={error} />
    if(!data) return <NoData>Something went wrong</NoData>
    if(!data.items.length) return <NoData>No items yet.</NoData>
    return(
        <div className="grid-items">
            {data.items.map(item => <Item key={item.id} item={item} />)}
        </div>
    )
}

const Home = props => (
    <>
        <MetaTitle>Home</MetaTitle>
        <DisplayHomeItemsWrap query={RECENT_ITEMS_QUERY} title="Recent Items" />
        <DisplayHomeItemsWrap query={MOST_VOTED_ITEMS_QUERY} title="Popular items" />
    </>
)

export default Home;
export { MOST_VOTED_ITEMS_QUERY, RECENT_ITEMS_QUERY };