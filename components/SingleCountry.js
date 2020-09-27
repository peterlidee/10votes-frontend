// this component displays single countries, fe /location/be

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { perPage } from '../config';
import getRouterData from '../lib/getRouterData';

import Loader from './snippets/Loader';
import Error from './snippets/Error';
import MetaTitle from './snippets/MetaTitle';
import FancyTitle from './snippets/FancyTitle';
import OrderItems from './OrderItems';
import DisplayItems from './DisplayItems';
import Pagination from './Pagination';

const COUNTRY_QUERY = gql`
    query COUNTRY_QUERY($countryCode: String!){
        country(where: { countryCode: $countryCode }){
            id
            name
        }
    }
`

const ITEMS_IN_COUNTRY_QUERY = gql`
    query ITEMS_IN_COUNTRY_QUERY(
        $countryCode: String!, 
        $orderBy: ItemOrderByInput, 
        $skip: Int = 0, 
        $first: Int = ${perPage}
    ){
        items(
            where: { location: { country: { countryCode: $countryCode }}},
            orderBy: $orderBy,
            skip: $skip,
            first: $first,
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

const SingleCountry = props => {
    const routerData = getRouterData(true);
    return(
        <Query 
            query={COUNTRY_QUERY} 
            variables={ routerData.variables } 
            // fetchPolicy="cache-and-network" // limited to BE so no need for now
        >
            {({loading, error, data}) => {
                if(loading) return <Loader containerClass="items-loader" />;                
                if(error) return <Error error={error} />
                if(!data || !data.country) return <p className="no-data">Hmmm, we don't have a country '{routerData.variables.countryCode}' in our database yet :/</p>
                return(
                    <section>
                        <MetaTitle>{`Pics in ${data.country.name}`}</MetaTitle>
                        <FancyTitle type="country" country={{ name: data.country.name }} />
                        <OrderItems />
                        <Query 
                            query={ITEMS_IN_COUNTRY_QUERY} variables={{ 
                                countryCode: routerData.variables.countryCode,
                                orderBy: routerData.orderBy,
                                skip: routerData.page * perPage - perPage || 0,
                            }} 
                            fetchPolicy="cache-and-network"
                        >
                            {payload => <DisplayItems payload={payload} page={routerData.page} taxonomy="country" />}
                        </Query>
                        <Pagination />
                    </section>
                );
            }}
        </Query>
    );
};

export default SingleCountry;