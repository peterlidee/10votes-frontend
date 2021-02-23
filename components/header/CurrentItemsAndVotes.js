// this component get called when a user is logged in
// it returns 2 menu items: my votes + count and my pics + count,
// we put this into a seperate queries because when an upload is made or a vote cast
// it doesn't trigger more rerenders

import Link from 'next/link'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment'

// query all votes from current user
const USER_VOTES_QUERY = gql`
    query{
        userVotes{
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

// query all items from current user
const USER_ITEMS_QUERY = gql`
    query{
        userItems{
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
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

// return the count of votes/items
function Count(props){ // type is either votes or items
    const query = props.type == 'votes' ? USER_VOTES_QUERY : USER_ITEMS_QUERY;
    const { loading, error, data } = useQuery(query);
    // the query returns data.userVotes or data.userItems, 
    // so we need to transform props.type into that
    const queryProp = `user${capitalizeFirstLetter(props.type)}`;
    if(loading || error || !data || !data[queryProp]) return null;
    return data[queryProp].length;
}

Count.propTypes = {
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
export {USER_VOTES_QUERY, USER_ITEMS_QUERY};