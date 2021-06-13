// this component 
// 1. shows an edit item button for logged in user who own this item
// 2. shows an edit item and edit user button for admins (except fro his/her own items)

import { useContext } from 'react'
import Link from 'next/link'
import UserContext from '../context/UserContext'

import PropTypes from 'prop-types'

// first check if current user is an admin
// or if current user owns item
function IsAdminOwner(props){
    const { loading, error, data } = useContext(UserContext);
    if(error || loading || !data || !data.me) return null;
    const isAdmin = data.me.permissions.includes('ADMIN');
    const isOwner = props.userId == data.me.id ? true : false;
    if(!isAdmin && !isOwner) return null;
    return <ItemEdit {...props} isAdmin={isAdmin} isOwner={isOwner} />
}

IsAdminOwner.propTypes = {
    itemId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
}

const ItemEdit = (props) => { // itemId, userId, isAdmin, isOwner
    // only admin class when user is admin but does not own pic
    const linkClass = `item__edit-link ${props.isAdmin && !props.isOwner ? 'item__edit-link--admin' : ''}`;
    return(
        <div className="item__edit">
            <Link
                href={{
                    pathname: '/update',
                    query: { id: props.itemId },
                }}>
                <a className={linkClass}>edit item</a>
            </Link>
            {props.isAdmin && !props.isOwner &&
                <Link
                    href={{
                        pathname: '/admin/user',
                        query: { id: props.userId },
                    }}>
                    <a className={linkClass}>edit user</a>
                </Link>}
        </div>
    )
}

ItemEdit.propTypes = {
    itemId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isOwner: PropTypes.bool.isRequired,
}

export default IsAdminOwner;