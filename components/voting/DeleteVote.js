//import { Mutation } from 'react-apollo';
//import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../account/User';

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
                id
                votes{
                    id
                }
            }
        }
    }
`;

const DeleteVote = props => (
    <Mutation 
        mutation={DELETE_VOTE_MUTATION} 
        variables={{ voteId: props.voteId, itemId: props.itemId }}
        refetchQueries={[ 
            { query: CURRENT_USER_QUERY }, 
        ]}>
            {(deleteVote, {loading, error}) => (
                <>
                    <button onClick={
                        // we need to catch and handle a possible error, not sure how else to catch this
                        () => deleteVote().catch(error => console.error(error))
                    } disabled={loading} className="item__vote-button">undo vote {String.fromCharCode(45)}</button>
                    {error && <Error error={error} />}
                </>
            )}
    </Mutation>
);

export default DeleteVote;