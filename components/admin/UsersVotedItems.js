import { useQuery } from '@apollo/client'
import { ITEMS_BY_IDS } from '../../queriesAndMutations/items/itemQueries'

import Loader from '../snippets/Loader'
import Error from '../snippets/Error'
import NoData from '../snippets/NoData'
import Item from '../item/Item'

const UsersVotedItemsWrapper = props => (
    <section style={{marginBottom: '4em'}}>
        <h1 className="title">Users' votes</h1>
        <UsersVotedItems {...props} />
    </section>
)

const UsersVotedItems = props => {
    const ids = props.votes.map(vote => vote.item.id);
    const { loading, error, data } = useQuery(ITEMS_BY_IDS, { 
        variables: { ids: ids },
        fetchPolicy: "cache-and-network",
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data.itemsByIds) return <NoData>Uhm, something went wrong :/. Try reloading the page.</NoData>;
    if(!data.itemsByIds.length){
        return <NoData>Looks like the user didn't vote on anything.</NoData>
    }
    return(
        <div className="grid-items">
            {data.itemsByIds.map(item => <Item key={item.id} item={item} hideVote={true} /> )}
        </div>
    )
}

export default UsersVotedItemsWrapper;