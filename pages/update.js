import PleaseSignin from '../components/account/PleaseSignin';
import UpdateItem from '../components/item/UpdateItem';

// use these for SSR of the item
import { SINGLE_ITEM_QUERY } from '../components/item/SingleItem';
import { initializeApollo, addApolloState } from '../lib/apollo';
import CurrentUserItems from '../components/items/CurrentUserItems';

const Update = props => {
    return(
        <PleaseSignin>
            <CurrentUserItems>
                <UpdateItem itemId={props.itemId} />
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
        }).catch(error => console.warn(error.message))
    }
  
    return addApolloState(apolloClient, {
        props: { itemId: id },
    })
}

export default Update;