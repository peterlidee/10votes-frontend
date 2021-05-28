import { initializeApollo, addApolloState } from '../../lib/apollo'
import AdminGate from "../../components/admin/AdminGate"
import EditTaxonomy from "../../components/admin/EditTaxonomy"

function UsersPage(props){
    return(
        <AdminGate>
            <EditTaxonomy id={props.userId} type="users" />
        </AdminGate>
    )
}

// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// this will make a server-side request 
// we don't query cause user logged in doesn't work ssr
export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()
    const id = context.query.id || "";
  
    return addApolloState(apolloClient, {
        props: { userId: id },
    })
}

export default UsersPage;