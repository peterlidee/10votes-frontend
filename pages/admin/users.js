import { initializeApollo, addApolloState } from '../../lib/apollo'
import { SINGLE_USER_QUERY } from '../../queriesAndMutations/users/userQueries'
import AdminGate from "../../components/admin/AdminGate"
import EditUser from "../../components/admin/EditUser"

function UsersPage(props){
    return(
        <AdminGate>
            <EditUser userId={props.userId} type="users" />
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
            query: SINGLE_USER_QUERY,
            variables: { userId: id },
        }).catch(error => console.warn(error.message))
    }
  
    return addApolloState(apolloClient, {
        props: { userId: id },
    })
}

export default UsersPage;