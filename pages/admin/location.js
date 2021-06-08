import { initializeApollo, addApolloState } from '../../lib/apollo'

import AdminGate from "../../components/admin/AdminGate"
import EditTaxonomy from "../../components/admin/EditTaxonomy"

function LocationsPage(props){
    return(
        <AdminGate>
            <EditTaxonomy id={props.locationId} type="locations" />
        </AdminGate>
    )
}

// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// this will make a server-side request 
export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()
    const id = context.query.id || "";
  
    return addApolloState(apolloClient, {
        props: { locationId: id },
    })
}

export default LocationsPage;