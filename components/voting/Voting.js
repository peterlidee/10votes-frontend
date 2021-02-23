import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import UserContext from '../context/UserContext';

import Vote from './Vote';
import DeleteVote from './DeleteVote';
import { USER_VOTES_QUERY } from '../header/CurrentItemsAndVotes';

// helper function
// this function tests if the property of an object in an array
// can also be found in the second array
// if so, it returns the object's id
// if not it returns false
function findDuplicate(arr1, arr2){
    let matchFound = false;
    // loop over all votes in item, foreach check if it matches any of the user's votes
    arr1.forEach(obj1 => {
        const index = arr2.findIndex(obj2 => obj2.id == obj1.id);
        if(index >= 0){
            matchFound = arr2[index].id
        }
    });
    return matchFound;
}

// this function return null when not logged in or loading, else Voting
// only show voting or unvoting when logged in
function LoggedIn(props){
    // get user from context
    const { data, loading, error } = useContext(UserContext);
    if(loading || error || !data || !data.me) return null;
    return <Voting {...props} />
}

function Voting(props){

    // now we know the user is logged in
    // get the votes of this user
    // we use seperate query for this
    const { error, data, loading } = useQuery(USER_VOTES_QUERY);
    if(loading || error || !data|| !data.userVotes) return null;
    const votes = data.userVotes;

    // has the user already voted for this item?
    // if so, always show unvote
    // we check this by comparing the votes on the item, passed by SingleItem as currentItemVotes
    // with the votes of the user, passed by USER_VOTES_QUERY
    const itemGotVotedForAlready = findDuplicate(props.currentItemVotes, votes);
    if(itemGotVotedForAlready){
        return <DeleteVote voteId={itemGotVotedForAlready} itemId={props.currentItemId} />
    }

    // next, check if user has votes left, if not, don't show the vote button
    if(votes.length >= 10){
        return null;
    }
    // TODO test with vote limit

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