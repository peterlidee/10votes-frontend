import Link from 'next/link'
import { useContext } from 'react';

import UserContext from '../context/UserContext'
import GetItemsCount from '../items/GetItemsCount'

function TaxonomyTitleCount(props){
    return(
        <span className="title__count">
            <GetItemsCount type={props.type} data={props.data}>
                {({ loading, error, data }) => {
                    if(loading || error || !data || !data.itemsConnection) return "_ pics";
                    const count = data.itemsConnection.aggregate.count;
                    return <>{count} {count === 1 ? "pic" : "pics"}</>
                }}
            </GetItemsCount>
        </span>
    )
}

function TitleName(props){ // data and type
    // no country edit
    if(props.type == 'country') return props.data.country.name;

    const name = props.type == 'locations' ? props.data.locations[0].name : props.data.tag.name;
    const id = props.type == 'locations' ? props.data.locations[0].id : props.data.tag.id;

    // check isAdmin
    const { loading, error, data } = useContext(UserContext);
    if(loading || error || !data || !data.me) return name;
    const isAdmin = data.me.permissions.includes('ADMIN');
    if(!isAdmin) return name;

    return(
        <Link href={{
            pathname: `/admin/${props.type.slice(0,-1)}`,
            query: { id: id },
        }}>
            <a className="title__admin-link">{name}</a>
        </Link>
    )
}

function TaxonomyTitle({ type, data }){
    return(
        <h1 className={`title title--large title--taxonomy title--${type}`}>
            <TitleName type={type} data={data} />
            {type == "locations" &&  
                <Link href={`/location/${data.locations[0].country.countryCode}`}>
                    <a className="title__country-link">{data.locations[0].country.countryCode}</a>
                </Link>
            }
            <TaxonomyTitleCount type={type} data={data} />
        </h1>
    )
}

export default TaxonomyTitle;