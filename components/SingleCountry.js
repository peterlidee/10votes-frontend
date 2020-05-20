import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Error from './Error';
import Item from './Item';
import OrderItems from './OrderItems';
import verifyOrderParam from '../lib/verifyOrderParam';

const COUNTRY_QUERY = gql`
    query COUNTRY_QUERY($country: String!){
        country(where: { countryCode: $country }){
            id
            name
        }
    }
`

const ITEMS_IN_COUNTRY_QUERY = gql`
    query ITEMS_IN_COUNTRY_QUERY($country: String!, $orderBy: ItemOrderByInput){
        items(
            where: { location: { country: { countryCode: $country }}},
            orderBy: $orderBy,
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

const SingleCountry = props => (
    <Query query={COUNTRY_QUERY} variables={{ country: props.query.country }}>
        {({loading, error, data}) => {
            if(loading) return <p>...loading</p>
            if(error) return <Error error={error} />
            if(!data.country) return <p>The query for "<strong>{props.query.country}</strong>" had no results.</p>
            const countryName = data.country.name;
            return(
                <div>
                    <h2>{countryName}</h2>
                    <OrderItems query={props.query} path="/location" />
                    <Query query={ITEMS_IN_COUNTRY_QUERY} variables={{ 
                        country: props.query.country,
                        orderBy: verifyOrderParam(props.query.orderBy),
                    }}>
                        {({ error, data, loading }) => {
                            if(loading) return <p>...loading</p>
                            if(error) return <Error error={error} />
                            if(!data.items || data.items.length == 0) return(
                                <div>
                                    <p>No items in {countryName} yet.</p>
                                    <p>
                                        Maybe you have a good picture in {countryName}? <Link href="/sell"><a>add the picture</a></Link>
                                    </p>
                                </div>
                            );
                            const { items } = data;
                            return(
                                <div>
                                    { 
                                    // todo this needs pagination!!!
                                    items.map(item => <Item item={item} key={item.id} />)}
                                </div>
                            )
                        }}
                    </Query>
                </div>
            );
        }}
    </Query>
);

export default SingleCountry;
// export {ITEMS_IN_COUNTRY_QUERY};