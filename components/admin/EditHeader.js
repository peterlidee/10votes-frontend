// produces header for edit tag, locations and user
// includes also the meta title

import Link from 'next/link';
import IconPin from '../snippets/icons/IconPin';
import MetaTitle from '../snippets/MetaTitle'

const EditHeader = (props) => { // props: type (users, locations, tags) and data
    const typeSingular = props.type.slice(0,-1);
    const name = props.data[typeSingular].name || props.data[typeSingular].email;
    return (
        <>
            <MetaTitle>{"Edit tag #" + props.data[typeSingular].name}</MetaTitle>
            <MetaTitle>{`Edit ${typeSingular} #` + props.type == 'users' ? 'user' : name }</MetaTitle>
            <div className={`admin__taxonomy-header admin__taxonomy-header--${props.type}`}> 
                <span className="taxonomy-header__label">edit {typeSingular}</span>
                <h1 className="title title--admin taxonomy-header__title">
                    {props.type == 'tags' && "#" }
                    {props.type == 'locations' && <span className="taxonomy-header__icon"><IconPin /></span> }
                    {props.type == 'users' && <span className="avatar avatar--small"><IconPin /></span> }
                    {name}
                </h1>
                <Link href="/admin" >
                    <a className="taxonomy-header__link">&lt; back to admin</a>
                </Link>
            </div>
        </>
    )
}

export default EditHeader;