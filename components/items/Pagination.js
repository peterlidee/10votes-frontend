import Link from 'next/link';
import PropTypes from 'prop-types';
import { perPage } from '../../config';
import GetItemsCount from './GetItemsCount';
import getQueriesVariablesPathsFromType from '../../lib/getQueriesVariablesPathsFromType';

const Pagination = (props) => { // props: type, data, page
    return(
        // get the itemsCount for the type
        <GetItemsCount {...props}>
            {({ loading, error, data: countData }) => {
                if(loading || error || !countData) return null;
                const itemsCount = countData.itemsConnection.aggregate.count;
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

                // get query and path to feed to Link
                // the link query will need an extra prop orderBy which we add later inside the loop
                const { pathname, query } = getQueriesVariablesPathsFromType({
                    taxonomyType: props.type,
                    queryType: "linkQuery",
                }, props.data);

                // add orderBy to query, is constant
                query.orderBy = props.orderBy;

                return(
                    <div className="items__pagination">
                        {props.page > 1 && // the prev link
                            <>
                                <Link href={{
                                        pathname: pathname,
                                        query: { ...query, page: props.page - 1, }
                                    }}
                                >
                                    <a className="pagination__link pagination__link--prevnext">prev</a>
                                </Link>
                            </>
                        }
                        {pageLinks.map((pageLink) => ( // the links to each page: 1 2 3 4 ...
                            <span key={`pagelink-${pageLink}`}>
                                {pageLink == props.page && 
                                    <span className="pagination__link pagination__link--current">{pageLink}</span>}
                                {pageLink != props.page && 
                                    <Link
                                        href={{ 
                                            pathname: pathname,
                                            query: { ...query, page: pageLink, }
                                        }}
                                    >
                                        <a className="pagination__link">{pageLink}</a>
                                    </Link>
                                }
                            </span>
                        ))}
                        {(props.page < totalPages) && // the next link
                            <Link href={{
                                    pathname: pathname,
                                    query: { ...query, page: +props.page + 1, }
                                }}
                            >
                                <a className="pagination__link pagination__link--prevnext">next</a>
                            </Link>
                        }
                    </div>
                ) 
            }}
        </GetItemsCount>
    )
}

Pagination.propTypes = {
    orderBy: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
};

export default Pagination;