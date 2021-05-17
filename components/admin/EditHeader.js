// produces header for edit tag, locations and user
// includes also the meta title

import PropTypes from 'prop-types';

import Link from 'next/link'
import IconPin from '../snippets/icons/IconPin'
import MetaTitle from '../snippets/MetaTitle'

const EditHeader = (props) => { // props: type (users, locations, tags) and data
    const typeSingular = props.type.slice(0,-1);
    const name = props.data[typeSingular].name || props.data[typeSingular].email;
    return (
        <>
            <MetaTitle>{`Edit ${typeSingular} ${props.type == 'tags' ? '#' : ''}` + (props.type == 'users' ? '' : name) }</MetaTitle>
            <div className={`admin-header admin-header--${props.type}`}> 
                <span className="admin-header__label">edit {typeSingular}</span>
                <h1 className="title title--admin admin-header__title">
                    {props.type == 'tags' && "#" }
                    {props.type == 'locations' && <span className="admin-header__title__icon"><IconPin /></span> }
                    {name}
                </h1>
                <Link href="/admin" >
                    <a className="admin-header__link">&lt; back to admin</a>
                </Link>
            </div>
        </>
    )
}

EditHeader.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditHeader;