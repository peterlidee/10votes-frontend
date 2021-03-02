import PleaseSignin from '../components/account/PleaseSignin';
import UpdateItem from '../components/items/UpdateItem';

// get the page query from router
import { useRouter } from 'next/router';

// use these for SSR of the item
import { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { initializeApollo, addApolloState } from '../lib/apollo';

const Update = props => {
    // get the id from the url
    const router =  useRouter();
    const id = router.query.id || "";
    return(
        <PleaseSignin>
            <UpdateItem id={id} />
        </PleaseSignin>
    )
};

// TODO: add SSR from item.js

export default Update;