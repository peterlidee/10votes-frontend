// displays tag, fe .../tags/test

import { initializeApollo, addApolloState } from '../../lib/apollo';
import verifyOrderParam from '../../lib/verifyOrderParam'
import SingleTaxonomyExists  from '../../components/items/SingleTaxonomyExists';
import { TAG_EXISTS_QUERY } from '../../components/items/SingleTaxonomyQueries';

const Tagpage = props => (
    <SingleTaxonomyExists type="tag" {...props} />
)

// this function only runs on the server by Next.js
// first get the page query
// then run TAG_EXISTS_QUERY with that page query
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()

    const tagSlug = params.tagSlug;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = query.page || 1;

    if(tagSlug){
        await apolloClient.query({
            query: TAG_EXISTS_QUERY,
            variables: { tagSlug: tagSlug },
        })
    }

    return addApolloState(apolloClient, {
        props: { tagSlug, orderBy, page },
    })
}

export default Tagpage;