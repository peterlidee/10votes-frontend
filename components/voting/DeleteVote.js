import { useMutation } from '@apollo/client'
import { USER_VOTES_QUERY } from '../../queriesAndMutations/votes/voteQueries'
import { DELETE_VOTE_MUTATION } from '../../queriesAndMutations/votes/voteMutations'

import Error from '../snippets/Error'

function DeleteVote(props){
    const [deleteVote, { error, loading }] = useMutation(DELETE_VOTE_MUTATION, {
        variables: { voteId: props.voteId, itemId: props.itemId },
        update(cache, { data }){
            // a vote was just unmade, now we remove it from the cache of USER_VOTES_QUERY
            // this should also update singleItem????
            // TODO: check if it works on items
            // get the cache of USER_VOTES_QUERY
            const userVotesCache = cache.readQuery({
                query: USER_VOTES_QUERY,
            });
            // check if data was returned and there is data in cache
            if(data.deleteVote && userVotesCache){
                // we update the cache by removing the data (a vote) returned from deleteVote from 
                // the cache of USER_VOTES_QUERY
                // construct the new cache array
                const newUserVotes = userVotesCache.userVotes.filter(userVote => userVote.id != data.deleteVote.id);
                //console.log('newUSerVotes',newUserVotes)
                // and write it
                cache.writeQuery({
                    query: USER_VOTES_QUERY,
                    data: {
                        userVotes: newUserVotes
                    },
                });
            }
        }
    })
    return(
        <>
            <button onClick={
                // we need to catch and handle a possible error, not sure how else to catch this
                () => deleteVote().catch(error => console.error('deleteVote', error))
            } disabled={loading} className="item__vote-button">undo vote {String.fromCharCode(45)}</button>
            {error && <Error error={error} />}
        </>
    )
}

export default DeleteVote;