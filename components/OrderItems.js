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

    return(
        <div className="items__order">
            <span className={`order__label order__label--${activeOrder}`}>sort</span>
            {["date", "votes"].map((option, i) => (
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
                    <a className={
                        option === activeOrder ? 
                            `order__option order__option--${i} order__option--${sortOrder}` : 
                            `order__option order__option--${i}`
                    }>
                        {option}
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default OrderItems;