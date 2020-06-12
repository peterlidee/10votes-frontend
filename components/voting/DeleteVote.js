import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../Error';
import { CURRENT_USER_QUERY } from '../account/User';

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
                    <Error error={error} />
                    <button onClick={deleteVote} disabled={loading}>delete vote</button>
                </>
            )}
    </Mutation>
);

export default DeleteVote;