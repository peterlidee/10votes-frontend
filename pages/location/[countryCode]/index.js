// displays country, fe .../location/be

import { initializeApollo, addApolloState } from '../../../lib/apollo'
import { verifyOrderParam } from '../../../lib/helpers'
import SingleTaxonomyExists from '../../../components/taxonomy/SingleTaxonomyExists'

const CountryPage = props => (
    <SingleTaxonomyExists type="country" {...props} />
)

// this function only runs on the server by Next.js
// first get the page query
// then run SINGLE_COUNTRY_QUERY with that page query
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()
    
    const countryCode = params.countryCode;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = +query.page || 1;

    return addApolloState(apolloClient, {
        props: { countryCode, orderBy, page },
    })
}

export default CountryPage;