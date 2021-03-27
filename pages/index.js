import { initializeApollo, addApolloState } from '../lib/apollo';
import { MOST_VOTED_ITEMS_QUERY, RECENT_ITEMS_QUERY } from '../components/Home';
import Home from '../components/Home';


const Index = props => <Home />

// this function only runs on the server by Next.js
// then run TAG_EXISTS_QUERY with that page query
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()

    await apolloClient.query({ query: RECENT_ITEMS_QUERY }).catch(error => console.warn(error.message))
    await apolloClient.query({ query: MOST_VOTED_ITEMS_QUERY }).catch(error => console.warn(error.message))

    return addApolloState(apolloClient, {
        props: {},
    })
}

export default Index;