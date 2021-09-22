import { useQuery } from '@apollo/client';
import { ITEMS_QUERY } from '../queriesAndMutations/items/itemQueries'

import MetaTitle from './snippets/MetaTitle';
import Loader from './snippets/Loader';
import Error from './snippets/Error';
import NoData from './snippets/NoData';
import Item from './item/Item';

function DisplayHomeItemsWrap(props){
    return(
        <section style={{marginBottom: "4em"}}>
            <h1 className="title title--large">{props.title}</h1>
            <DisplayHomeItems query={props.query} orderBy={props.orderBy} />
        </section>
    );
}

function DisplayHomeItems(props){
    const { loading, error, data } = useQuery(ITEMS_QUERY, { 
        variables: { orderBy: props.orderBy },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
    });
    if(loading) return <Loader containerClass="items-loader" />;
    if(error) return <Error error={error} />
    if(!data || !data.items) return <NoData>Something went wrong</NoData>
    if(!data.items.length) return <NoData>No items yet.</NoData>
    return(
        <div className="grid-items">
            {data.items.map(item => <Item key={item.id} item={item} />)}
        </div>
    )
}

const Home = () => (
    <>
        <MetaTitle>Home</MetaTitle>
        <DisplayHomeItemsWrap title="Popular items" orderBy="voteCount_DESC" />
        <DisplayHomeItemsWrap title="Recent Items" orderBy="createdAt_DESC" />
    </>
)

export default Home;