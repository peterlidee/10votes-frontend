import PleaseSignin from '../components/account/PleaseSignin';
import UpdateItem from '../components/item/UpdateItem';

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

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()
    const id = context.query.id || "";
    return addApolloState(apolloClient, {
        props: { itemId: id },
    })
}

export default Update;