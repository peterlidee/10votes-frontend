// this component get called when a user is logged in
// it returns 2 menu items: my votes and my pics,
// each with a number next to it
// we put this into a seperate query because when an upload is made or a vote cast
// we can refetch this query alone, not the main query which would trigger a rerender and 
// a new loading state

import Link from 'next/link'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'

const CURRENT_ITEMS_AND_VOTES_QUERY = gql`
    query{
        me{
            items{
                id
            }
            votes{
                id
            }
        }
    }
`;

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
    const { loading, error, data } = useQuery(CURRENT_ITEMS_AND_VOTES_QUERY);
    console.log('data',props.type, data)
    if(loading || error || !data || !data.me) return null;
    return data.me[props.type].length;
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
export {CURRENT_ITEMS_AND_VOTES_QUERY};