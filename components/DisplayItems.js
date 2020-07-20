// this component removes code duplication
// used in SingleTag, SingleLocation and SingleCountry

import PropTypes from 'prop-types';
import Error from './Error';
import Link from 'next/link';
import Item from './Item';
import Pagination from './Pagination';

const DisplayItems = props => {
    const { error, data, loading } = props.payload;
    if(loading) return <p>...loading</p>
    if(error) return <Error error={error} />
    if(!data.items) return <p>Uhm, something went wrong. Try again?</p>
    if(data.items.length == 0 && props.page && props.page > 1){
        return <p>No more items to display.</p>
    }
    if(data.items.length == 0) return(
        <p>No items yet for this {props.taxonomy}. Maybe you would like to <Link href="/addapicture"><a>add one?</a></Link></p>
    )
    return(
        <div>
            <div className="grid-items">
                {data.items.map(item => <Item key={item.id} item={item} />)}
            </div>
            <Pagination />
        </div>

                        

    )
};

DisplayItems.propTypes = {
    payload: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    taxonomy: PropTypes.string.isRequired
};

export default DisplayItems;