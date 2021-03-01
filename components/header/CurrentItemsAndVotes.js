// this component get called when a user is logged in
// it returns 2 menu items: my votes + count and my pics + count,
// the function calls UserItemsContext and UserVotesContext for it's data

import { useContext } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'

import UserItemsContext from '../context/UserItemsContext';
import UserVotesContext from '../context/UserVotesContext';

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// return the count of votes/items
function Count(props){ // type is either votes or items
    const context = props.type == 'votes' ? UserVotesContext : UserItemsContext;
    const { loading, error, data } = useContext(context);
    // the query returns data.userVotes or data.userItems, 
    // so we need to transform props.type into that
    const queryProp = `user${capitalizeFirstLetter(props.type)}`;
    if(loading || error || !data || !data[queryProp]) return null;
    return data[queryProp].length;
}

Count.propTypes = {
    type: PropTypes.string.isRequired,
}

// return menuItem for either votes or items
function MenuItem(props){ 
    return(
        <Link href={`/your${props.type}`}>
            <a className={`mymenu my${props.type}`}>
                <span className="mymenu__label">your {props.type == "items" ? "pics" : props.type}</span>
                <span className="mymenu__number"><Count type={props.type} /></span>
            </a>
        </Link>
    )
}

MenuItem.propTypes = {
    type: PropTypes.string.isRequired,
}

function CurrentItemsAndVotes(){
    const items = ['votes', 'items'];
    return(
        <>
            {items.map(item => <MenuItem type={item} key={item} />)}
        </>
    );
}

export default CurrentItemsAndVotes;