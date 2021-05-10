import { initializeApollo, addApolloState } from '../lib/apollo';
import { ITEMS_QUERY } from '../queriesAndMutations/items/itemQueries'
import Home from '../components/Home';

const Index = props => <Home />

// this function only runs on the server by Next.js
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()
    
    // query recent items
    await apolloClient.query({ query: ITEMS_QUERY, variables: { orderBy: "createdAt_DESC" }}).catch(error => console.warn(error.message))
    // query most voted items
    await apolloClient.query({ query: ITEMS_QUERY, variables: { orderBy: "voteCount_DESC" }}).catch(error => console.warn(error.message))

    return addApolloState(apolloClient, {
        props: {},
    })
}

export default Index;