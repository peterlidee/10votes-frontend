import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemsCount from '../items/ItemsCount';

const FancyTitle = props => (
    <header className="title__container">
        <h1 className={`items__title items__title--single-${props.type}`}>
            <div className="title__count">
                <ItemsCount />
            </div>
            {props.type == "location" && props.location.name &&  <div className="title__name">{props.location.name}</div>}
            {props.type == "country" && props.country.name &&    <div className="title__name">{props.country.name}</div>}
            {props.type == "tag" && props.tag.name &&            <div className="title__name">{props.tag.name}</div>}
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
FancyTitle.defaultProps = {
    country: {},
    location: {},
    tag: {},
};

export default FancyTitle;