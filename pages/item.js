import SingleItem from '../components/item/SingleItem';
import { SINGLE_ITEM_QUERY } from '../queriesAndMutations/items/itemQueries'
import { initializeApollo, addApolloState } from '../lib/apollo';

const ItemPage = (props) => {
    return <SingleItem itemId={props.itemId} />
}

// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// this will make a server-side request 
export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()

    const id = context.query.id || "";

    if(id){
        await apolloClient.query({
            query: SINGLE_ITEM_QUERY,
            variables: { itemId: id },
        }).catch(error => console.warn(error.message))
    }
  
    return addApolloState(apolloClient, {
        props: { itemId: id },
    })
}

export default ItemPage;