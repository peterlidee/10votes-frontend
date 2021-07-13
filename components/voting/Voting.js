import { useContext } from 'react';
import PropTypes from 'prop-types';

import UserVotesContext from '../context/UserVotesContext';
import UserContext from '../context/UserContext';
import Vote from './Vote';
import DeleteVote from './DeleteVote';

// this function return null when not logged in or loading, else Voting
// only show voting or unvoting when logged in
function LoggedIn(props){
    // get user from context
    const { data, loading, error } = useContext(UserContext);
    if(loading || error || !data || !data.me) return null;
    return <Voting {...props} />
}

function Voting(props){

    // we know the user is logged in cause gated component
    // get the votes of this user
    const { loading, error, data } = useContext(UserVotesContext);
    if(loading || error || !data || !data.userVotes) return null;

    // check if any voted items correspond with currentItemId
    const alreadyVotedIndex = data.userVotes.findIndex(userVote => userVote?.item?.id == props.currentItemId);

    if(alreadyVotedIndex >= 0){        
        return <DeleteVote voteId={data.userVotes[alreadyVotedIndex].id} itemId={props.currentItemId} />
    }

    // check if user has votes left, if not, don't show the vote button
    if(data.userVotes.length >= 10){
        return null;
    }

    // else, the user is logged in 
    // the user has votes left
    // and the user hasn't voted for the item alreay
    // so, show vote button
    return <Vote id={props.currentItemId} />
}

Voting.propTypes = {
    currentItemId: PropTypes.string.isRequired,
}

export default LoggedIn;