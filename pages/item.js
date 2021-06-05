import SingleItem from '../components/item/SingleItem';
import { initializeApollo, addApolloState } from '../lib/apollo';

const ItemPage = (props) => <SingleItem itemId={props.itemId} />

//https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
//this will make a server-side request 
export async function getServerSideProps({ query }) {
    const apolloClient = initializeApollo()
    const id = query.id || ""; 
    return addApolloState(apolloClient, {
        props: { itemId: id },
    })
}

export default ItemPage;