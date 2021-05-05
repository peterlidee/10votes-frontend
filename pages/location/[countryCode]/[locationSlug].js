// displays location, fe .../location/be/gent

import { initializeApollo, addApolloState } from '../../../lib/apollo';
import verifyOrderParam from '../../../lib/verifyOrderParam'
import SingleTaxonomyExists from '../../../components/items/SingleTaxonomyExists';
import { LOCATIONS_QUERY } from '../../../queriesAndMutations/locations/locationQueries'

const LocationPage = props => (
    <SingleTaxonomyExists type="locations" {...props} />
)

// this function only runs on the server by Next.js
// first get the page query
// then run COUNTRY_EXISTS_QUERY with that page query
export async function getServerSideProps({params, query}){
    const apolloClient = initializeApollo()

    const locationSlug = params.locationSlug;
    const countryCode = params.countryCode;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = +query.page || 1;
    
    if(countryCode && locationSlug){
        await apolloClient.query({
            query: LOCATIONS_QUERY,
            variables: { locationSlug: locationSlug, countryCode: countryCode },
        }).catch(error => console.warn(error.message))
    }

    return addApolloState(apolloClient, {
        props: { locationSlug, countryCode, orderBy, page },
    })
}

export default LocationPage;