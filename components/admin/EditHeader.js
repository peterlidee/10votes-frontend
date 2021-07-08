// produces header for edit tag, locations and user
// includes also the meta title

import PropTypes from 'prop-types';

import Link from 'next/link'
import MetaTitle from '../snippets/MetaTitle'

const EditHeader = (props) => { // props: type (users, locations, tags) and data
    const typeSingular = props.type.slice(0,-1);
    const name = props.data[typeSingular].name || props.data[typeSingular].email;
    return (
        <>
            <MetaTitle>{`Edit ${typeSingular} ${props.type == 'tags' ? '#' : ''}` + (props.type == 'users' ? '' : name) }</MetaTitle>
            <header className="admin__header">
                <h1 className={`title title--large title--admin title--${props.type}`}>{name}</h1>
                <Link href="/admin" >
                    <a className="admin__back-link">&lt; back to admin</a>
                </Link>
            </header>
        </>
    )
}

EditHeader.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditHeader;