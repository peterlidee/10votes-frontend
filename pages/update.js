import PleaseSignin from '../components/account/PleaseSignin';
import UpdateItem from '../components/items/UpdateItem';

// get the page query from router
import { useRouter } from 'next/router';

// use these for SSR of the item
import { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { initializeApollo, addApolloState } from '../lib/apollo';
import CurrentUserItems from '../components/items/CurrentUserItems';

const Update = props => {
    // get the id from the url
    const router =  useRouter();
    const id = router.query.id || "";
    return(
        <PleaseSignin>
            <CurrentUserItems>
                <UpdateItem id={id} />
            </CurrentUserItems>
        </PleaseSignin>
    )
};

// TODO: add SSR from item.js
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

export default Update;