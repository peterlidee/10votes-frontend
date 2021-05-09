import { initializeApollo, addApolloState } from '../lib/apollo';
import { ITEMS_QUERY } from '../queriesAndMutations/items/itemQueries'
import Home from '../components/Home';


const Index = props => <Home />

// this function only runs on the server by Next.js
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()
    
    // TODO: fix these queries, need vars?
    await apolloClient.query({ query: ITEMS_QUERY }).catch(error => console.warn(error.message))
    await apolloClient.query({ query: ITEMS_QUERY }).catch(error => console.warn(error.message))

    return addApolloState(apolloClient, {
        props: {},
    })
}

export default Index;