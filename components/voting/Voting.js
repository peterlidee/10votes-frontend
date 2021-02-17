import { useContext } from 'react';
import UserContext from '../context/UserContext';
import PropTypes from 'prop-types';

import Vote from './Vote';
import DeleteVote from './DeleteVote';

function Voting(props){
    // get user from context
    const { error, data, loading } = useContext(UserContext);

    console.log('user',data)
    
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
    // default fallback
    return null;
}

Voting.propTypes = {
    currentItemId: PropTypes.string.isRequired,
}

export default Voting;