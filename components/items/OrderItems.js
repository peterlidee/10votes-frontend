// this component renders the sorting links: sort by votes of date, asc or desc

import Link from 'next/link';
import PropTypes from 'prop-types';
import getPaths from '../../lib/getPaths';

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

    // get query and path to feed to Link
    // the link query will need an extra prop orderBy which we add later inside the loop
    const { pathname, query } = getPaths(props.type, props.data);

    return (
        <div className="items__order">
            <span className={`order__label order__label--${activeOrder}`}>sort</span>
            {["date", "votes"].map((option, i) => {

                // figure out what orderParam needs to be attached to the link
                const orderByParam = option == activeOrder ? reverseOrderBy(orderBy) : option === 'date' ? 'createdAt_DESC' : 'voteCount_DESC';
                    
                return(
                    <Link
                        key={option}
                        href={{
                            pathname: pathname,
                            query: {...query, orderBy: orderByParam },
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