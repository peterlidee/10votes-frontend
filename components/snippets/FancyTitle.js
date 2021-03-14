import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemsCount from '../item/ItemsCount';
import GetItemsCount from '../item/getItemsCount';

const FancyTitle = props => (
    <header className="title__container">
        <h1 className={`items__title items__title--single-${props.type}`}>
            <div className="title__count">
                <GetItemsCount {...props}>
                    {({ data }) => {
                        const count = data.itemsConnection.aggregate.count;
                        return(
                            <>
                                <span className="title__count-number">{count}</span>
                                <span className="title__count-label">{count === 1 ? 'pic' : "pics"}</span>
                            </>
                        )
                    }}
                </GetItemsCount>
            </div>
            {props.type == "location" && props.location.name &&  <div className="title__name">{props.location.name}</div>}
            {props.type == "country" && props.country.name &&    <div className="title__name">{props.country.name}</div>}
            {props.type == "tag" && props.tagName &&             <div className="title__name">{props.tagName}</div>}
            <div className="title__country-container">
                {props.type == "location" && props.country.countryCode && props.country.name && (
                    <Link 
                        href="/location/[countryCode]" 
                        as={`/location/${props.country.countryCode}`}
                    >
                        <a className="title__country">{props.country.name}</a>
                    </Link>
                )}
            </div>
        </h1>
    </header> 
)

FancyTitle.propTypes = {
    type: PropTypes.string.isRequired, // location, country or tag
}
// TODO  remove dfaultProps?
FancyTitle.defaultProps = {
    country: {},
    location: {},
    tag: {},
};

export default FancyTitle;