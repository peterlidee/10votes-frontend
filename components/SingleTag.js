// this component displays single tags, fe /tags/test

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getRouterData from '../lib/getRouterData';
import { perPage } from '../config';
import Error from './Error';
import OrderItems from './OrderItems';
import ItemsCount from './ItemsCount';
import DisplayItems from './DisplayItems';

const TAG_EXISTS_QUERY = gql`
    query TAG_EXISTS_QUERY($slug: String!){
        tag(where: { slug: $slug }){
            id
            name
        }
    }
`;

const ITEMS_WITH_TAG_QUERY = gql`
    query ITEMS_WITH_TAG_QUERY($slug: String!, $orderBy: ItemOrderByInput, $skip: Int = 0, $first: Int = ${perPage}){
        items(
            where: { tags_some: { slug: $slug }},
            orderBy: $orderBy
            skip: $skip,
            first: $first
        ){
            id
            image
            largeImage
            tags{
                id
                name
                slug
            }
            votes{
                id
            }
            voteCount
            location{
                id
                name
                slug
                country{
                    id
                    name
                    countryCode
                }
            }
        }
    }
`;

const Tag = props => {
    // first check if there's such a tag
    // then call all
    const routerData = getRouterData(true);
    return (
        <div>
            <Query query={TAG_EXISTS_QUERY} variables={ routerData.variables }>
                {({data, loading, error}) => {
                    if(loading) return <p>...loading</p>
                    if(error) return <Error error={error} />
                    if(!data.tag) return <p>Hmmm, there doesn't seem to be a tag '{routerData.variables.slug}' :/.</p>
                    return(
                        <div>
                            <h2><ItemsCount /> items with tag #{data.tag.name}</h2>
                            <OrderItems />
                            <Query query={ITEMS_WITH_TAG_QUERY} variables={{
                                slug: routerData.variables.slug,
                                orderBy: routerData.orderBy,
                                skip: routerData.page * perPage - perPage || 0,
                            }}>
                                {payload => <DisplayItems payload={payload} page={routerData.page} taxonomy="tag" />}
                            </Query>
                        </div>
                    )
                }}
            </Query>
        </div>
    );
}

export default Tag;