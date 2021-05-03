import { useQuery } from '@apollo/client';
import { SINGLE_TAG_QUERY } from '../../queriesAndMutations/tags/tagQueries';
import { SINGLE_LOCATION_QUERY } from '../../queriesAndMutations/locations/locationQueries';
import { SINGLE_USER_QUERY } from '../../queriesAndMutations/users/userQueries';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';

import SingleTaxonomyQuery from './SingleTaxonomyQuery';

const EditTag = (props) => { // props: tagId and type (locations, tags, users)
    return(
        <SingleTaxonomyQuery {...props}>
            {(data) => {
                console.log('data',data)
                return(
                    <div>
                        hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)].name}
                    </div>
                )
            }}
        </SingleTaxonomyQuery>
    )
}

const EditTag2 = (props) => { // props: tagId and type (locations, tags, users)
    if(!props[`${props.type.slice(0,-1)}Id`]) return <NoData>No tag found.</NoData>
    // select the correct query
    const queries = {
        tags: SINGLE_TAG_QUERY,
        locations: SINGLE_LOCATION_QUERY,
        users: SINGLE_USER_QUERY,
    }
    // make the query
    const { loading, error, data } = useQuery(queries[props.type], { variables: { [`${props.type.slice(0,-1)}Id`]: props[`${props.type.slice(0,-1)}Id`] }});
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data[props.type.slice(0,-1)]) return <NoData>No tag found.</NoData>

    console.log('data',data)
    return(
        <div>
            back to admin link
            title: edit tag #tagname
            tag overview
            change tag to new tag
            delete tag
        </div>
    )
}

export default EditTag;