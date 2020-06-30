// this component displays single places, fe /location/be/gent

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getRouterData from '../lib/getRouterData';
import { perPage } from '../config';
import Error from './Error';
import OrderItems from './OrderItems';
import DisplayItems from './DisplayItems';
import ItemsCount from './items/ItemsCount';
import Title from './Title';

const LOCATION_EXISTS_QUERY = gql`
    query LOCATION_QUERY($slug: String!, $countryCode: String!){
        locations(where: { AND: [
            { slug: $slug },
            { country: { countryCode: $countryCode }}
        ]}){
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
`;

const ITEMS_IN_LOCATION_QUERY = gql`
    query ITEMS_IN_LOCATION_QUERY(
        $slug: String!, 
        $countryCode: String!, 
        $orderBy: ItemOrderByInput, 
        $skip: Int = 0, 
        $first: Int = ${perPage}
    ){
        items(
            where: { AND: [
                { location: { slug: $slug }},
                { location: { country: { countryCode: $countryCode }}},
            ]},
            orderBy: $orderBy,
            skip: $skip,
            first: $first,
        ){
            id
            image
            largeImage
            votes{
                id
            }
            voteCount
            tags{
                id
                name
                slug
            }
        }
    }
`;

const SingleLocation = props => {
    const routerData = getRouterData(true);
    //console.log('routerdata singleLocation', routerData)
    return(
        <Query query={LOCATION_EXISTS_QUERY} variables={ routerData.variables }>
            {({ error, data, loading }) => {
                if(loading) return <p>...loading</p>
                if(error) return <Error error={error} />
                if(!data.locations[0]) return( 
                    <p>Hmmm, there doesn't seem to be a place '{routerData.variables.slug} - {routerData.variables.countryCode}' :/.</p>
                )
                const { name, country } = data.locations[0];
                const description = `items in ${name} - ${country.name}`;
                return(
                    <div>
                        <Title>{description}</Title>
                        <h2><ItemsCount /> {description}</h2>
                        <OrderItems />
                        <Query query={ITEMS_IN_LOCATION_QUERY} variables={{ 
                            slug: routerData.variables.slug, 
                            countryCode: routerData.variables.countryCode,
                            orderBy: routerData.orderBy,
                            skip: routerData.page * perPage - perPage || 0,
                        }}>
                            {payload => <DisplayItems payload={payload} page={routerData.page} taxonomy="place" />}
                        </Query>
                    </div>
                )
            }}
        </Query>
    );
}

export default SingleLocation;