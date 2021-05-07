// displays tag, fe .../tags/test

import { initializeApollo, addApolloState } from '../../lib/apollo';
import verifyOrderParam from '../../lib/verifyOrderParam'
import SingleTaxonomyExists  from '../../components/taxonomy/SingleTaxonomyExists';
import { SINGLE_TAG_QUERY } from '../../queriesAndMutations/tags/tagQueries';

const Tagpage = props => (
    <SingleTaxonomyExists type="tags" {...props} />
)

// this function only runs on the server by Next.js
// first get the page query
// then run SINGLE_TAG_QUERY with that page query
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()

    const tagSlug = params.tagSlug;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = +query.page || 1;

    if(tagSlug){
        await apolloClient.query({
            query: SINGLE_TAG_QUERY,
            variables: { tagSlug: tagSlug },
        }).catch(error => console.warn(error.message))
    }

    return addApolloState(apolloClient, {
        props: { tagSlug, orderBy, page },
    })
}

export default Tagpage;