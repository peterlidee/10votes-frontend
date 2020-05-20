import verifyOrderParam from "../lib/verifyOrderParam";
import Link from 'next/link';
import PropTypes from 'prop-types';

function reverseOrderBy(orderBy){
    const splitOrderBy = orderBy.split('_');
    const newSort = splitOrderBy[1] == 'ASC' ? 'DESC' : 'ASC';
    return splitOrderBy[0] + '_' + newSort;
}

const OrderItems = props => {

    // 1. calculate the path to put in Link.href.pathname
    let hrefPathname = props.path;
    if(props.query.country) hrefPathname += `/[country]`;
    if(props.query.place) hrefPathname += `/[place]`;
    if(props.query.tagslug) hrefPathname += `/[tagslug]`;

    // 2. calculate the path to put in Link.as.pathname
    let asPathname = props.path;
    if(props.query.country) asPathname += `/${props.query.country}`;
    if(props.query.place) asPathname += `/${props.query.place}`;
    if(props.query.tagslug) asPathname += `/${props.query.tagslug}`;

    // 2. validate the order param
    const orderBy = verifyOrderParam(props.query.orderBy);
    
    // 3. find out activeOrder and sortOrder
    const activeOrder = orderBy.includes('created') ? 'date' : 'votes';
    const sortOrder = orderBy.includes('ASC') ? 'asc': 'desc';
    
    // temp arrows
    const arrows = {
        up: String.fromCharCode(9650),
        down : String.fromCharCode(9660),
        both: String.fromCharCode(9650) + String.fromCharCode(9660),
    }

    return(
        <div>
            sort by: 
            {["date", "votes"].map(option => (
                <Link
                    key={option}
                    href={{
                        pathname: hrefPathname,
                        query: {
                            orderBy: option === activeOrder ? reverseOrderBy(orderBy) : 
                                option === 'date' ? 'createdAt_DESC' : 'voteCount_DESC',
                        }
                    }}
                    as={{
                        pathname: asPathname,
                        query: {
                            orderBy: option === activeOrder ? reverseOrderBy(orderBy) : 
                                option === 'date' ? 'createdAt_DESC' : 'voteCount_DESC',
                        }
                    }}
                >
                    <a>
                        {option === activeOrder && 
                            <strong>
                                {option}
                                {sortOrder === 'asc' && <>{arrows.up}</>}
                                {sortOrder === 'desc' && <>{arrows.down}</>}
                            </strong>
                        }
                        {option != activeOrder && 
                            <>
                                {option}
                                {arrows.both}
                            </>
                        }
                    </a>
                </Link>
            ))}
        </div>
    )
}

OrderItems.propTypes = {
    query: PropTypes.object.isRequired,
}

export default OrderItems;