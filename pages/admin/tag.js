import { initializeApollo, addApolloState } from '../../lib/apollo'

//import { SINGLE_TAG_QUERY } from '../../queriesAndMutations/tags/tagQueries'

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

    // if(id){
    //     await apolloClient.query({
    //         query: SINGLE_TAG_QUERY,
    //         variables: { tagId: id },
    //     }).catch(error => console.warn(error.message))
    // }
  
    return addApolloState(apolloClient, {
        props: { tagId: id },
    })
}

export default TagsPage;