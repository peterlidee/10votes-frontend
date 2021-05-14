// this component makes a single user, location or tag query
// it handles no id, error and loading and no data
// it returns data when found
// used in admin/editTag, admin/editLocation and admin/editUser

import { useQuery } from '@apollo/client';
import getQueriesAndVariables from '../../lib/getQueriesAndVariables';

import PropTypes from 'prop-types';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';
import Link from 'next/link';

const SingleTaxonomyAdmin = (props) => { // props: tagId and type (locations, tags, users)
    // construct the correct key from props.type, f.e. tagId or locationId or userId
    const key = `${props.type.slice(0,-1)}Id`;
    // check if there's an Id prop or if it's empty
    if(!props[key]) return(
        <NoData>
            No {props.type.slice(0,-1)} found.
            <Link href="/admin" >
                <a className="no-data__link">&lt; back to admin</a>
            </Link>    
        </NoData>
    )
    
    // get the relevant query and variables
    const { query, variables } = getQueriesAndVariables(props.type, 'single', {[key]: props[key]});
    // make the query
    // variables f.e. { tagId: 123564 }
    const { loading, error, data } = useQuery(query, { variables });

    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data[props.type.slice(0,-1)]) return(
        <NoData>
            No {props.type.slice(0,-1)} found.
            <Link href="/admin" >
                <a className="no-data__link">&lt; back to admin</a>
            </Link>    
        </NoData>
    )

    return props.children(data);
}

SingleTaxonomyAdmin.propTypes = {
    type: PropTypes.string.isRequired,
}

export default SingleTaxonomyAdmin;