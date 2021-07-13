// displays location, fe .../location/be/gent

import { initializeApollo, addApolloState } from '../../../lib/apollo'
import { verifyOrderParam } from '../../../lib/helpers'
import SingleTaxonomyExists from '../../../components/taxonomy/SingleTaxonomyExists'

const LocationPage = props => (
    <SingleTaxonomyExists type="locations" {...props} />
)

// this function only runs on the server by Next.js
// first get the page query
// then run LOCATIONS_QUERY with that page query
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()

    const locationSlug = params.locationSlug;
    const countryCode = params.countryCode;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = +query.page || 1;

    return addApolloState(apolloClient, {
        props: { locationSlug, countryCode, orderBy, page },
    })
}

export default LocationPage;