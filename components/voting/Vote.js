import { useMutation } from '@apollo/client'
import { USER_VOTES_QUERY } from '../../queriesAndMutations/votes/voteQueries'
import { VOTE_MUTATION } from '../../queriesAndMutations/votes/voteMutations'

import Error from '../snippets/Error';

function Vote(props){
    const [castVote, {error, loading}] = useMutation(VOTE_MUTATION, {
        variables: { itemId: props.id },
        update (cache, { data }) {

            // the user just voted on an item, and the useMutation returned that vote
            // so we're gonna update the cache of USER_VOTES_QUERY with this vote

            // get the cache of USER_VOTES_QUERY
            const userVotesCache = cache.readQuery({
                query: USER_VOTES_QUERY,
            });

            // check if data was returned
            // and check if there is data in cache
            if(data.castVote && userVotesCache){
                // we update the cache but adding the data (a vote) returned from castvote to 
                // the cache of USER_VOTES_QUERY
                // construct the new cache array
                const newUserVotes = [...userVotesCache.userVotes, data.castVote];
                // and write it
                cache.writeQuery({
                    query: USER_VOTES_QUERY,
                    data: {
                        userVotes: newUserVotes
                    },
                });
            }
        }
    });
    return(
        <>
            <button onClick={
                // we need to catch and handle a possible error, not sure how else to catch this
                () => castVote().catch(error => console.error(error.message))
            } disabled={loading} className="item__vote-button">vote {String.fromCharCode(43)}</button>
            {error && <Error error={error} />}
        </>
    )
}

export default Vote;