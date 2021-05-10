import { useMutation, gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../../queriesAndMutations/fragments/itemFragment'

import Error from '../snippets/Error';
import { USER_VOTES_QUERY } from '../../queriesAndMutations/votes/voteQueries'

const VOTE_MUTATION = gql`
    mutation VOTE_MUTATION($itemId: ID!){
        castVote(itemId: $itemId){
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

function Vote(props){
    const [castVote, {error, data, loading}] = useMutation(VOTE_MUTATION, {
        variables: { itemId: props.id },
        update (cache, { data }) {
            // the user just voted on an item, and the useMutation returned that vote
            // so we're gonna update the cache of USER_VOTES_QUERY with this vote
            // as we asked no only for the vote but also for the item
            // vote { id item { ... } }
            // the SingleItem query also gets updated, 
            // so we don't have to do that manually, yay for apollo

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