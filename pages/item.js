import { useRouter } from 'next/router';
import SingleItem from '../components/SingleItem';
import { initializeApollo, addApolloState } from '../lib/apollo';
import { SINGLE_ITEM_QUERY } from '../components/SingleItem';

const Item = () => {
    // get the id from the url
    const router =  useRouter();
    const id = router.query.id || "";
    return <SingleItem id={id} />
}

// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// this will make a server-side request but since the fetch-policy is cache and network it will make another request once rendered
export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()

    const id = context.query.id || "";

    if(id){
        await apolloClient.query({
            query: SINGLE_ITEM_QUERY,
            variables: { itemId: id },
        })
    }
  
    return addApolloState(apolloClient, {
        props: {},
    })
}

export default Item;