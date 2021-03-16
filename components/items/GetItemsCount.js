// this component return the total amount of items in tags - location - country
// this component returns render function with data (data.itemsConnection.aggregate.count)
// it requires a tagSlug or a locationSlug and or a countryCode

import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { TAG_COUNT_QUERY, LOCATION_COUNT_QUERY, COUNTRY_COUNT_QUERY } from './SingleTaxonomyQueries';

const GetItemsCount = (props) => { // props: data and type
    const variables = {}
    let query;
    if(props.type == 'tag'){
        variables.tagSlug = props.data.tag.slug;
        query = TAG_COUNT_QUERY;
    }
    if(props.type == 'location'){
        variables.locationSlug = props.data.locations[0].slug;
        variables.countryCode = props.data.locations[0].country.countryCode;
        query = LOCATION_COUNT_QUERY;

    }
    if(props.type == 'country'){
        variables.countryCode = props.data.country.countryCode;
        query = COUNTRY_COUNT_QUERY;

    }
    const { loading, error, data } = useQuery(query, { variables })
    if(loading || error || !data || !data.itemsConnection) return null;  
    return props.children({data})
}

GetItemsCount.propTypes = {
    type: PropTypes.string.isRequired, // location, country or tag
    data: PropTypes.object.isRequired
}

export default GetItemsCount;