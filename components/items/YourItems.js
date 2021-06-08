// this component displays the users items
// it get the items from useritemscontext, no ssr (yet?)

import { useContext } from 'react';
import Link from 'next/link';

import UserItemsContext from '../context/UserItemsContext';
import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';
import UploadButton from '../snippets/UploadButton';
import Item from '../item/Item';

function YourItemsWrap(){
    return(
        <section>
            <MetaTitle>Your pics</MetaTitle>
            <h1 className="title">Your pics</h1>
            <YourItems />
        </section>
    )
}

function YourItems(){
    // get userItems context
    const { error, data, loading } = useContext(UserItemsContext);
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data.userItems) return <NoData>Uhm, something went wrong :/. Try reloading the page.</NoData>;
    if(!data.userItems.length){
        return <NoData>Looks like you haven't uploaded any pics yet. Maybe <Link href="/addapicture"><a>upload your first pic</a></Link>?</NoData>
    }
    const message = "You can edit or delete your uploaded pics here."
    return(
        <>
            {data.userItems.length == 10 && 
                <p className="items__message">{message} You used all your uploads. We like that.</p>}
            {data.userItems.length < 10 &&
                <p className="items__message">{message} You have {10 - data.userItems.length} uploads left.</p>}
            {data.userItems.length > 0 &&
                <div className="grid-items">
                    {data.userItems.map(item => <Item key={item.id} item={item} showEdit={true} hideVote={true} /> )}
                </div>
            }
            {data.userItems.length < 10 &&
                <div className="items__footer">
                    <span style={{"paddingRight": ".5em"}}>You have {10 - data.userItems.length} uploads left.</span>
                    <UploadButton />
                </div>
            }
        </>
    )
}

export default YourItemsWrap;