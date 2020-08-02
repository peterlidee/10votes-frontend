// this component displays single places, fe /location/be/gent

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getRouterData from '../lib/getRouterData';
import { perPage } from '../config';
import Error from './Error';
import OrderItems from './OrderItems';
import DisplayItems from './DisplayItems';
import MetaTitle from './snippets/MetaTitle';
import Loader from './snippets/Loader';

import FancyTitle from './snippets/FancyTitle';

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

const SingleLocation = props => {
    const routerData = getRouterData(true);
    //console.log('routerdata singleLocation', routerData)
    return(
        <Query query={LOCATION_EXISTS_QUERY} variables={ routerData.variables }>
            {({ error, data, loading }) => {

                //if(loading) return <div className="no-result"><p>...loading</p></div>
                if(loading) return <Loader containerClass="items-loader" />;
                
                if(error) return <div className="no-result"><Error error={error} /></div>
                if(!data.locations[0]) return( 
                    <div className="no-result">
                        <p>Hmmm, we don't have a place '{routerData.variables.slug} - {routerData.variables.countryCode}' in our database yet :/</p>
                    </div>
                )
                const { name, country } = data.locations[0];
                return(
                    <section>
                        <MetaTitle>{`items in ${name} - ${country.name}`}</MetaTitle>
                        <FancyTitle type="location" location={{ name }} country={{ name: country.name, countryCode: country.countryCode }} />
                        <OrderItems />
                        <Query query={ITEMS_IN_LOCATION_QUERY} variables={{ 
                            slug: routerData.variables.slug, 
                            countryCode: routerData.variables.countryCode,
                            orderBy: routerData.orderBy,
                            skip: routerData.page * perPage - perPage || 0,
                        }}>
                            {payload => <DisplayItems payload={payload} page={routerData.page} taxonomy="place" />}
                        </Query>
                    </section>
                )
            }}
        </Query>
    );
}

export default SingleLocation;