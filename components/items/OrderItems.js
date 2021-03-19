// this component renders the sorting links: sort by votes of date, asc or desc

import Link from 'next/link';
import PropTypes from 'prop-types';

// takes orderParam and returns inverse sort
// f.e. createdAt_DESC -> createdAt_ASC
function reverseOrderBy(orderBy){
    const splitOrderBy = orderBy.split('_');
    const newSort = splitOrderBy[1] == 'ASC' ? 'DESC' : 'ASC';
    return splitOrderBy[0] + '_' + newSort;
}

const OrderItems = props => { // props: type, orderBy, data

    const orderBy = props.orderBy;
    const activeOrder = orderBy.includes('created') ? 'date' : 'votes';
    const sortOrder = orderBy.includes('ASC') ? 'asc': 'desc';

    return (
        <div className="items__order">
            <span className={`order__label order__label--${activeOrder}`}>sort</span>
            {["date", "votes"].map((option, i) => {
                // init the hrefPath
                let hrefPath = "";
                // init the query param
                const query = {};

                if(props.type == "tag"){
                    hrefPath = "/tags/[tagslug]";
                    query.tagslug = props.data.tag.slug;
                }
                if(props.type == "location"){
                    hrefPath = "/location/[countryCode]/[locationSlug]";
                    query.locationSlug = props.data.locations[0].slug;
                    query.countryCode = props.data.locations[0].country.countryCode;
                }
                if(props.type == "country"){
                    hrefPath = "/location/[countryCode]";
                    query.countryCode = props.data.country.countryCode;
                }

                // figure out what orderParam needs to be attached to the link
                const orderByParam = option == activeOrder ? reverseOrderBy(orderBy) : option === 'date' ? 'createdAt_DESC' : 'voteCount_DESC';
                query.orderBy = orderByParam;
                    
                return(
                    <Link
                        key={option}
                        href={{
                            pathname: hrefPath,
                            query: query,
                        }}
                    >
                        <a className={
                            option === activeOrder ? 
                                `order__option order__option--${i} order__option--${sortOrder}` : 
                                `order__option order__option--${i}`
                        }>
                            {option}
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}

OrderItems.propTypes = {
    orderBy: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default OrderItems;