import { useMutation, gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment'
import { USER_VOTES_QUERY } from '../context/UserVotesContext';
import Error from '../snippets/Error';

const DELETE_VOTE_MUTATION = gql`
    mutation DELETE_VOTE_MUTATION(
        $voteId: ID!
        $itemId: ID!
    ){
        deleteVote(
            voteId: $voteId
            itemId: $itemId
        ){
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

function DeleteVote(props){
    const [deleteVote, { error, loading }] = useMutation(DELETE_VOTE_MUTATION, {
        variables: { voteId: props.voteId, itemId: props.itemId },
        update(cache, { data }){
            // a vote was just unmade, now we remove it from the cache of USER_VOTES_QUERY
            // this should also update singleItem?
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
                // console.log('data',data)
                // console.log('userVotesCache',userVotesCache)

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