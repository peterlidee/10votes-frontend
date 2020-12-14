//import { Mutation } from 'react-apollo';
//import gql from 'graphql-tag';

import Error from '../snippets/Error';
import { CURRENT_USER_QUERY } from '../account/User';

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
        refetchQueries={[ { query: CURRENT_USER_QUERY }, ]}>
            {(castVote, {loading, error, called}) => (
                <>
                    <button onClick={
                        // we need to catch and handle a possible error, not sure how else to catch this
                        () => castVote().catch(error => console.error(error.message))
                    } disabled={loading} className="item__vote-button">vote {String.fromCharCode(43)}</button>
                    {error && <Error error={error} />}
                </>
            )}
    </Mutation>
);

export default Vote;
