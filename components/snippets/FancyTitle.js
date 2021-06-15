import { useContext } from 'react'
import Link from 'next/link'

import UserContext from '../context/UserContext'
import GetItemsCount from '../items/GetItemsCount'
import PropTypes from 'prop-types'

function EditLink(props){
    if(props.type == 'country') return null;
    const { loading, error, data } = useContext(UserContext);
    if(loading || error || !data || !data.me) return null;
    const isAdmin = data.me.permissions.includes('ADMIN');
    if(!isAdmin) return null;
    const id = props.type == 'tags' ? props.data.tag.id : props.data.locations[0].id;
    return(
        <Link href={{
            pathname: `/admin/${props.type.slice(0,-1)}`,
            query: { id: id },
        }}>
            <a className="fancy-title__admin-link">edit</a>
        </Link>
    )
}

function TitleCount({ type, data }){
    return(
        <GetItemsCount type={type} data={data}>
            {({ data: countData }) => {
                const count = countData.itemsConnection.aggregate.count;
                return(
                    <div className="fancy-title__count">
                        <span className="fancy-title__count-number">{count}</span>
                        <span className="fancy-title__count-label">{count === 1 ? 'pic' : "pics"}</span>
                    </div>
                )
            }}
        </GetItemsCount>
    )
}

const FancyTitle = ({ type, data }) => (
    <div className="fancy-title__container">

    
    <header className={`fancy-title fancy-title--${type}`}>
        <div className="fancy-title__meta">
            <TitleCount type={type} data={data} />
            <EditLink type={type} data={data} />
        </div>
        <h1 className={`fancy-title__name fancy-title__name--${type}`}>
            {type == "locations" &&  data.locations[0].name}
            {type == "country" &&    data.country.name}
            {type == "tags" &&       data.tag.name}
        </h1>
        {type == "locations" && (
            <Link href={`/location/${data.locations[0].country.countryCode}`}>
                <a className="fancy-title__subtitle">{data.locations[0].country.name}</a>
            </Link>
        )}


        {/*

        <h1 className={`items__title items__title--single-${type.slice(0,-1)}`}>
            {type == "locations" &&  <div className="title__name">{data.locations[0].name}</div>}
            {type == "country" &&    <div className="title__name">{data.country.name}</div>}
            {type == "tags" &&       <div className="title__name">{data.tag.name}</div>}
            <div className="title__country-container">
                {type == "locations" && (
                    <Link 
                        href="/location/[countryCode]" 
                        as={`/location/${data.locations[0].country.countryCode}`}
                    >
                        <a className="title__country">{data.locations[0].country.name}</a>
                    </Link>
                )}
            </div>
                </h1>*/}
    </header> 
    </div>
)

FancyTitle.propTypes = {
    type: PropTypes.string.isRequired, // locations, country or tags
    data: PropTypes.object.isRequired
}

export default FancyTitle;