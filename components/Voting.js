import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './account/User';
import PropTypes from 'prop-types';

import Vote from './Vote';
import DeleteVote from './DeleteVote';

const Voting = (props) => (
    <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data }) => {
            
            // 1. only show VOTING if user is logged in
            // 2. only show VOTE when user has votes left
            // 3. don't show when user has voted on this item
            // 4. don't show UNVOTE when there was no vote yet
            // 5. only show unvote when user has voted

            if(loading || error || !data.me) return null;
            
            const { votes } = data.me;
            // check if the user has already voted for this item
            const indexItemInVotes = votes.findIndex(vote => vote.item.id === props.currentItemId);
            const hasItemInVotes = indexItemInVotes >= 0;

            if(votes.length >= 10){
                // vote limit reached, don't show VOTE
                // has the item been voted for?
                if(hasItemInVotes){ // yes
                    // show unvote, pass vote id
                    return <DeleteVote voteId={votes[indexItemInVotes].id} itemId={props.currentItemId} />
                }
            }else{
                // there are votes left to cast
                // has the item been voted for?
                if(hasItemInVotes){ // yes
                    // show unvote, pass vote id
                    return <DeleteVote voteId={votes[indexItemInVotes].id} itemId={props.currentItemId} />
                }else{ // no
                    // show vote, pass item id
                    return <Vote id={props.currentItemId} />
                }
            }

            return null;
        }}
    </Query>
)

Voting.propTypes = {
    currentItemId: PropTypes.string.isRequired,
    //myVotes: PropTypes.object.isRequired,
}

export default Voting;