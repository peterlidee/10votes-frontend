// this function return the current user items
// it returns data but also a loading and error state
// it gets it's data from userItemsContext
// if no items, []
// if no user, [null]

import React, { useContext } from 'react';

import UserItemsContext from '../context/UserItemsContext';
import Loader from "../snippets/Loader";
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';

function CurrentUserItems(props){
    const { loading, error, data } = useContext( UserItemsContext );
    if(loading) return <Loader containerClass="items-loader" />
    if(error)   return <Error error={error} />
    if(!data || !data.userItems) return <NoData>We couldn't find your pictures.</NoData>
    return(
        <>
            {React.cloneElement(props.children, { userItems: data.userItems })}
        </>
    )
}

export default CurrentUserItems;