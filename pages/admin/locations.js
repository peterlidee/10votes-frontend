import { initializeApollo, addApolloState } from '../../lib/apollo'
import { SINGLE_LOCATION_QUERY } from '../../queriesAndMutations/locations/locationQueries'
import AdminGate from "../../components/admin/AdminGate"
import EditLocation from "../../components/admin/EditLocation"

function LocationsPage(props){
    return(
        <AdminGate>
            <EditLocation locationId={props.locationId} type="locations" />
        </AdminGate>
    )
}

// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// this will make a server-side request 
export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()
    const id = context.query.id || "";

    if(id){
        await apolloClient.query({
            query: SINGLE_LOCATION_QUERY,
            variables: { locationId: id },
        }).catch(error => console.warn(error.message))
    }
  
    return addApolloState(apolloClient, {
        props: { locationId: id },
    })
}

export default LocationsPage;