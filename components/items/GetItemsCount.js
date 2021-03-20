// this component return the total amount of items in tags - location - country
// this component returns render function with data (data.itemsConnection.aggregate.count)
// it requires a tagSlug or a locationSlug and or a countryCode

import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import getQueriesVariablesPathsFromType from '../../lib/getQueriesVariablesPathsFromType';

const GetItemsCount = (props) => { // props: data and type
    // get query and variables to feed to useQuery
    const { query, variables } = getQueriesVariablesPathsFromType(
        { queryType: 'queryRequest', taxonomyType: props.type, gqlType: 'count' }, props.data
    );
    const { loading, error, data } = useQuery(query, { variables })
    if(loading || error || !data || !data.itemsConnection) return null;  
    return props.children({data})
}

GetItemsCount.propTypes = {
    type: PropTypes.string.isRequired, // location, country or tag
    data: PropTypes.object.isRequired
}

export default GetItemsCount;