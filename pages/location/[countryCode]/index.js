// displays country, fe .../location/be

import { initializeApollo, addApolloState } from '../../../lib/apollo';
import verifyOrderParam from '../../../lib/verifyOrderParam'
import SingleTaxonomyExists from '../../../components/taxonomy/SingleTaxonomyExists';
import { SINGLE_COUNTRY_QUERY } from '../../../queriesAndMutations/countries/countryQueries'

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
    
    if(countryCode){
        await apolloClient.query({
            query: SINGLE_COUNTRY_QUERY,
            variables: { countryCode: countryCode },
        }).catch(error => console.warn(error.message))
    }

    return addApolloState(apolloClient, {
        props: { countryCode, orderBy, page },
    })
}

export default CountryPage;