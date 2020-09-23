import { Query } from 'react-apollo';
import Link from 'next/link';
import { perPage } from '../config';
import getRouterData from '../lib/getRouterData';

const Pagination = props => {
    
    const routerData = getRouterData(true);
    //console.log('routerdata', routerData)

    return(
        <Query 
            query={ routerData.query } 
            variables={ routerData.variables }
            fetchPolicy="cache-and-network"
        >
            {({ data, loading, error })=> {
                if(loading || error || !data) return null;
                const itemsCount = data.itemsConnection.aggregate.count;
                const totalPages = Math.ceil(itemsCount / perPage);
                
                // no pagination when only one page
                if(itemsCount - perPage <= 0) return null; 
                
                // TODO build long pagination
                if(totalPages > 10) return <p>Long pagination</p>; 

                // construct the pagination
                let pageLinks = [];
                for(let i = 1; i <= totalPages; i++){
                    pageLinks.push(i)
                }

                return(
                    <div className="items__pagination">
                        {routerData.page > 1 &&
                            <Link
                                href={{
                                    pathname: routerData.hrefPath,
                                    query: {
                                        orderBy: routerData.orderBy,
                                        page: routerData.page - 1,
                                    }
                                }}
                                as={{
                                    pathname: routerData.asPath,
                                    query: {
                                        orderBy: routerData.orderBy,
                                        page: routerData.page - 1,
                                    }
                                }}
                            >
                                <a className="pagination__link pagination__link--prevnext">prev</a>
                            </Link>
                        }
                        {pageLinks.map((pageLink) => (
                            <span key={`pagelink-${pageLink}`}>
                                {pageLink === routerData.page && 
                                    <span className="pagination__link pagination__link--current">{pageLink}</span>}
                                {pageLink !== routerData.page && 
                                    <Link
                                        href={{
                                            pathname: routerData.hrefPath,
                                            query: {
                                                orderBy: routerData.orderBy,
                                                page: pageLink,
                                            }
                                        }}
                                        as={{
                                            pathname: routerData.asPath,
                                            query: {
                                                orderBy: routerData.orderBy,
                                                page: pageLink,
                                            }
                                        }}
                                    >
                                        <a className="pagination__link">{pageLink}</a>
                                    </Link>
                                }
                            </span>
                        ))}
                        {(routerData.page < totalPages) &&
                            <Link
                                href={{
                                    pathname: routerData.hrefPath,
                                    query: {
                                        orderBy: routerData.orderBy,
                                        page: routerData.page + 1,
                                    }
                                }}
                                as={{
                                    pathname: routerData.asPath,
                                    query: {
                                        orderBy: routerData.orderBy,
                                        page: routerData.page + 1,
                                    }
                                }}
                            >
                                <a className="pagination__link pagination__link--prevnext">next</a>
                            </Link>
                        }
                    </div>
                )
            }}
        </Query>
    )
}

export default Pagination;