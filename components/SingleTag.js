// this component displays single tags, fe /tags/test

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getRouterData from '../lib/getRouterData';
import { perPage } from '../config';

import Loader from './snippets/Loader';
import Error from './snippets/Error';
import MetaTitle from './snippets/MetaTitle';
import FancyTitle from './snippets/FancyTitle';
import OrderItems from './OrderItems';
import DisplayItems from './DisplayItems';
import Pagination from './Pagination';

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
}

export default Tag;