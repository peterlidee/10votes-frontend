import User from '../account/User';

import Item from '../Item';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import MetaTitle from '../snippets/MetaTitle';


const YourVotes = props => (
    <section>
        <MetaTitle>Your votes</MetaTitle>
        <h1 className="title">Your votes</h1>
        <User>
            {({ data, loading, error }) => {
                if(loading) return <Loader containerClass="items-loader" />;                
                if(error) return <Error error={error} />
                if(!data.me) return <p className="no-data">Uhm, something went wrong :/. Try reloading the page.</p>;
                const { me } = data;

                if(!me.votes.length){
                    return <p className="no-data">Looks like you don't have any votes yet. Nothing to see here then.</p>
                }
                return(
                    <>
                        {me.votes.length == 10 && 
                            <p className="items__message">You used up all your votes. Hope you chose wisely.</p>}
                        {me.votes.length < 10 &&
                            <p className="items__message">You have {10 - me.votes.length} votes left.</p>}
                        <div className="grid-items">
                            {me.votes.map(vote => <Item key={vote.id} item={vote.item} />) }
                        </div>
                    </>
                )
            }}
        </User>
    </section>
);

export default YourVotes;