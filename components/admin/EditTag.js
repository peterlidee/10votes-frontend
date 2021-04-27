import { useQuery } from '@apollo/client';
import { SINGLE_TAG_QUERY } from '../../queriesAndMutations/tags/tagQueries';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';

const EditTag = (props) => { // props: tagId
    if(!props.tagId) return <NoData>No tag found.</NoData>
    // make the query
    const { loading, error, data } = useQuery(SINGLE_TAG_QUERY, { variables: { tagId: props.tagId }});
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data.tag) return <NoData>No tag found.</NoData>

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