// this component displays single countries, fe /location/be

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { perPage } from '../config';
import getRouterData from '../lib/getRouterData';
import Error from './Error';
import OrderItems from './OrderItems';
import DisplayItems from './DisplayItems';
import ItemsCount from './ItemsCount';
import Title from './Title';

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
    //console.log('singleCountry routerdata', routerData)
    return(
        <Query query={COUNTRY_QUERY} variables={ routerData.variables }>
            {({loading, error, data}) => {
                if(loading) return <p>...loading</p>
                if(error) return <Error error={error} />
                if(!data.country) return <p>Hmmm, there doesn't seem to be a country '{routerData.variables.countryCode}' :/.</p>
                const countryName = data.country.name;
                const description = `items in ${countryName}`;
                return(
                    <div>
                        <Title>{description}</Title>
                        <h2><ItemsCount /> {description}</h2>
                        <OrderItems />
                        <Query query={ITEMS_IN_COUNTRY_QUERY} variables={{ 
                            countryCode: routerData.variables.countryCode,
                            orderBy: routerData.orderBy,
                            skip: routerData.page * perPage - perPage || 0,
                        }}>
                            {payload => <DisplayItems payload={payload} page={routerData.page} taxonomy="country" />}
                        </Query>
                    </div>
                );
            }}
        </Query>
    );
};

export default SingleCountry;