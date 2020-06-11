import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../Error';
import { CURRENT_USER_QUERY } from '../account/User';
import { ALL_ITEMS_QUERY } from '../Items';

const VOTE_MUTATION = gql`
    mutation VOTE_MUTATION($itemId: ID!){
        castVote(itemId: $itemId){
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

const Vote = props => (
    <Mutation 
        mutation={VOTE_MUTATION} 
        variables={{ itemId: props.id }}
        refetchQueries={[ { query: CURRENT_USER_QUERY }, { query: ALL_ITEMS_QUERY } ]}>
            {(castVote, {loading, error}) => (
                <>
                    <Error error={error} />
                    <button onClick={castVote} disabled={loading}>vote</button>
                </>
            )}
    </Mutation>
);

export default Vote;
