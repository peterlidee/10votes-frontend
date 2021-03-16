import PropTypes from 'prop-types';
import Link from 'next/link';
import GetItemsCount from '../items/GetItemsCount';

const FancyTitle = ({ type, data }) => (
    <header className="title__container">
        <h1 className={`items__title items__title--single-${type}`}>
            <div className="title__count">
                <GetItemsCount type={type} data={data}>
                    {({ data: countData }) => {
                        const count = countData.itemsConnection.aggregate.count;
                        return(
                            <>
                                <span className="title__count-number">{count}</span>
                                <span className="title__count-label">{count === 1 ? 'pic' : "pics"}</span>
                            </>
                        )
                    }}
                </GetItemsCount>
            </div>
            {type == "location" &&  <div className="title__name">{data.locations[0].name}</div>}
            {type == "country" &&   <div className="title__name">{data.country.name}</div>}
            {type == "tag" &&       <div className="title__name">{data.tag.name}</div>}
            <div className="title__country-container">
                {type == "location" && (
                    <Link 
                        href="/location/[countryCode]" 
                        as={`/location/${data.locations[0].country.countryCode}`}
                    >
                        <a className="title__country">{data.locations[0].country.name}</a>
                    </Link>
                )}
            </div>
        </h1>
    </header> 
)

FancyTitle.propTypes = {
    type: PropTypes.string.isRequired, // location, country or tag
    data: PropTypes.object.isRequired
}

export default FancyTitle;