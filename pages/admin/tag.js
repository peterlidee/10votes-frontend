import { initializeApollo, addApolloState } from '../../lib/apollo'

import AdminGate from "../../components/admin/AdminGate"
import EditTaxonomy from "../../components/admin/EditTaxonomy"

function TagsPage(props){
    return(
        <AdminGate>
            <EditTaxonomy id={props.tagId} type="tags" />
        </AdminGate>
    )
}

// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// this will make a server-side request 
export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()
    const id = context.query.id || "";
  
    return addApolloState(apolloClient, {
        props: { tagId: id },
    })
}

export default TagsPage;