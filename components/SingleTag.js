// this component displays single tags, fe /tags/test

//import { Query } from 'react-apollo';
//import gql from 'graphql-tag';

import { useQuery, gql } from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../gqlFragments/itemFragment';

import getRouterData from '../lib/getRouterData';
import { perPage } from '../config';

import Loader from './snippets/Loader';
import Error from './snippets/Error';
import MetaTitle from './snippets/MetaTitle';
import FancyTitle from './snippets/FancyTitle';
// import OrderItems from './OrderItems';
import DisplayItems from './DisplayItems';
import GetItemsCount from './item/getItemsCount';
// import Pagination from './items/Pagination';

const TAG_EXISTS_QUERY = gql`
    query TAG_EXISTS_QUERY($tagSlug: String!){
        tag( tagSlug: $tagSlug ){
            id
            name
            slug
        }
    }
`;

const ITEMS_WITH_TAG_QUERY = gql`
    query ITEMS_WITH_TAG_QUERY($tagSlug: String!, $orderBy: ItemOrderByInput, $skip: Int = 0, $first: Int = ${perPage}){
        items(
            tagSlug: $tagSlug,
            orderBy: $orderBy,
            skip: $skip,
            first: $first
        ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

// first we check if the tag really exists
// props -> page, orderBy, tagSlug  + ?? TODO or locationSlug and or countryCode
function SingleTagGate(props){
    // make tag query
    const { loading, error, data } = useQuery(TAG_EXISTS_QUERY, {
         variables: { tagSlug: props.tagSlug }
    })
    if(loading) return <Loader containerClass="items-loader" />;                
    if(error) return <Error error={error} />
    if(!data || !data.tag) return <p className="no-data">Hmmm, there doesn't seem to be a tag '<em>{props.tagSlug}</em>'. Try another tag? :/</p>

    return( 
        <section>
            <MetaTitle>{`Pics with tag #${data.tag.name}`}</MetaTitle>
            <FancyTitle type="tag" tagName={data.tag.name} tagSlug={data.tag.slug} />

            {/*<OrderItems />*/}
            <SingleTag {...props} />
            {/*<Pagination />*/}
        </section>
    );

    // return(
    //     <GetItemsCount tagSlug={props.tagSlug}>

    //         {(payload) => {
    //             console.log('payload',payload)
    //             return(
    //                 <section>
    //                     <MetaTitle>{`Pics with tag #${data.tag.name}`}</MetaTitle>
    //                     {/*<FancyTitle type="tag" tag={{ name: data.tag.name }}  />*/}
    //                     {/*<OrderItems />*/}
    //                     <SingleTag {...props} />
    //                     {/*<Pagination />*/}
    //                 </section>
    //             )
    //         }
    //         }
    //     </GetItemsCount>
    // );


}

function SingleTag(props){
    // now we know the tag exists, we query all items with this tag
    const payload = useQuery(ITEMS_WITH_TAG_QUERY, {
        variables: {
            tagSlug: props.tagSlug,
            orderBy: props.orderBy,
            skip: props.page * perPage - perPage || 0,
        }
    })
    return <DisplayItems payload={payload} page={props.page} taxonomy="tag" />
    //return 'hello'
}

/*const Tag = props => {
    // first check if there's such a tag
    // then call all
    const routerData = getRouterData(true);
    return (
        <Query query={TAG_EXISTS_QUERY} variables={ routerData.variables } fetchPolicy="cache-and-network">
            {({data, loading, error}) => {
                if(loading) return <Loader containerClass="items-loader" />;                
                if(error) return <Error error={error} />
                if(!data || !data.tag) return <p className="no-data">Hmmm, there doesn't seem to be a tag '{routerData.variables.slug}' :/.</p>
                return(
                    <section>
                        <MetaTitle>{`Pics with tag #${data.tag.name}`}</MetaTitle>
                        <FancyTitle type="tag" tag={{ name: data.tag.name }} />
                        <OrderItems />
                        <Query 
                            query={ITEMS_WITH_TAG_QUERY} variables={{
                                slug: routerData.variables.slug,
                                orderBy: routerData.orderBy,
                                skip: routerData.page * perPage - perPage || 0,
                            }} 
                            fetchPolicy="cache-and-network"
                        >
                            {payload => <DisplayItems payload={payload} page={routerData.page} taxonomy="tag" />}
                        </Query>
                        <Pagination />
                    </section>
                )
            }}
        </Query>
    );
}*/

export default SingleTagGate;