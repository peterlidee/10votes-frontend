// this component displays the users items he voted for
// it get the items from uservotescontext, no ssr (yet?)

import { useContext } from 'react';

import MetaTitle from '../snippets/MetaTitle';
import UserVotesContext from '../context/UserVotesContext';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';
import Item from '../item/Item';

function YourVotesWrap(){
    return(
    <section>
        <MetaTitle>Your votes</MetaTitle>
        <h1 className="title">Your votes</h1>
        <YourVotes />
    </section>
    ) 
}

function YourVotes(){
    const { loading, error, data } = useContext(UserVotesContext);
    if(loading) return <Loader containerClass="items-loader" />;                
    if(error) return <Error error={error} />
    if(!data.userVotes) return <NoData>Uhm, something went wrong :/. Try reloading the page.</NoData>;
    if(!data.userVotes.length){
        return <NoData>Looks like you don't have any votes yet. Nothing to see here then. :/</NoData>
    }
    return(
        <>
            {data.userVotes.length == 10 && 
                <p className="items__message">You used up all your votes. Hope you chose wisely.</p>}
            {data.userVotes.length < 10 &&
                <p className="items__message">You have {10 - data.userVotes.length} votes left.</p>}
            <div className="grid-items">
                {data.userVotes.map(vote => <Item key={vote.id} item={vote.item} />) }
            </div>
        </>
    )
}

export default YourVotesWrap;