// import verifyOrderParam from "../lib/verifyOrderParam";
import Link from 'next/link';
import getRouterData from '../lib/getRouterData';

function reverseOrderBy(orderBy){
    const splitOrderBy = orderBy.split('_');
    const newSort = splitOrderBy[1] == 'ASC' ? 'DESC' : 'ASC';
    return splitOrderBy[0] + '_' + newSort;
}

const OrderItems = props => {
    
    const routerData = getRouterData();
    // find out activeOrder and sortOrder
    const orderBy = routerData.orderBy;
    const activeOrder = orderBy.includes('created') ? 'date' : 'votes';
    const sortOrder = orderBy.includes('ASC') ? 'asc': 'desc';
    
    // temp arrows //TODO
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
                        pathname: routerData.hrefPath,
                        query: {
                            orderBy: option === activeOrder ? reverseOrderBy(orderBy) : 
                                option === 'date' ? 'createdAt_DESC' : 'voteCount_DESC',
                        }
                    }}
                    as={{
                        pathname: routerData.asPath,
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

export default OrderItems;