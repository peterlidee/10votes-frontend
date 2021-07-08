// this component return the total amount of items in tags - location - country
// this component returns render function with data (data.itemsConnection.aggregate.count)
// it requires a tagSlug/id or a locationSlug/id and or a countryCode/id

import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import getQueriesAndVariables from '../../lib/getQueriesAndVariables'

const GetItemsCount = (props) => { // props: data and type
    // get query and variables to feed to useQuery
    const { query, variables } = getQueriesAndVariables(props.type, "connection", props.data);
    const { loading, error, data } = useQuery(query, { 
        variables, 
        fetchPolicy: "cache-and-network" 
    })
    //if(loading || error || !data || !data.itemsConnection) return null;
    return props.children({loading, error, data})
}

GetItemsCount.propTypes = {
    type: PropTypes.string.isRequired, // location, country or tag
    data: PropTypes.object.isRequired
}

export default GetItemsCount;