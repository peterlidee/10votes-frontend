// displays tag, fe .../tag/test

import { initializeApollo, addApolloState } from '../../lib/apollo';
import { verifyOrderParam } from '../../lib/helpers'
import SingleTaxonomyExists  from '../../components/taxonomy/SingleTaxonomyExists';

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

    return addApolloState(apolloClient, {
        props: { tagSlug, orderBy, page },
    })
}

export default Tagpage;