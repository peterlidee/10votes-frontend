// this component makes a single user, location or tag query
// it handles no id, error and loading
// it returns data when found
// used in admin/editTag, admin/editLocation and admin/editUser

import { useQuery } from '@apollo/client';
import { SINGLE_TAG_QUERY } from '../../queriesAndMutations/tags/tagQueries';
import { SINGLE_LOCATION_QUERY } from '../../queriesAndMutations/locations/locationQueries';
import { SINGLE_USER_QUERY } from '../../queriesAndMutations/users/userQueries';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';

const queries = {
    tags: SINGLE_TAG_QUERY,
    locations: SINGLE_LOCATION_QUERY,
    users: SINGLE_USER_QUERY,
}

const SingleTaxonomyQuery = (props) => { // props: tagId and type (locations, tags, users)
    // construct the correct key from props.type, f.e. tagId or locationId or userId
    const key = `${props.type.slice(0,-1)}Id`;
    // check if there's an Id prop or if it's empty
    if(!props[key]) return <NoData>No tag found.</NoData>
    // make the query
    const { loading, error, data } = useQuery(queries[props.type], 
        { variables: { [key]: props[key] } // f.e. tagId: props.tagId
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data[props.type.slice(0,-1)]) return <NoData>No tag found.</NoData>
    return props.children(data);
}

export default SingleTaxonomyQuery;