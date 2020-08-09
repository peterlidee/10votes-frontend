// this component removes code duplication
// used in SingleTag, SingleLocation and SingleCountry

import PropTypes from 'prop-types';
import NewError from './NewError';
import Link from 'next/link';
import Item from './Item';
import Loader from './snippets/Loader';

const DisplayItems = props => {
    const { error, data, loading } = props.payload;
    if(loading) return <Loader containerClass="items-loader" />;
    if(error) return <NewError error={error} />
    if(!data || !data.items) return <p className="no-data">No pictures to display.</p>
    if(data.items.length == 0 && props.page && props.page > 1){
        return <p className="no-data">No more pictures to display.</p>
    }
    if(data.items.length == 0) return <p className="no-data">No pictures yet for this {props.taxonomy}. Maybe you would like to <Link href="/addapicture"><a>add one</a></Link>?</p>
    
    return(
        <div className="grid-items">
            {data.items.map(item => <Item key={item.id} item={item} />)}
        </div>
    )
};

DisplayItems.propTypes = {
    payload: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    taxonomy: PropTypes.string.isRequired
};

export default DisplayItems;