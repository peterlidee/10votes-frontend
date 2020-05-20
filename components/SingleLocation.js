import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Error from './Error';
import Item from './Item';
import OrderItems from './OrderItems';
import verifyOrderParam from '../lib/verifyOrderParam';

const LOCATION_QUERY = gql`
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
    query ITEMS_IN_LOCATION_QUERY($slug: String!, $countryCode: String!, $orderBy: ItemOrderByInput){
        items(
            where: { AND: [
                { location: { slug: $slug }},
                { location: { country: { countryCode: $countryCode }}},
            ]},
            orderBy: $orderBy
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

const SingleLocation = props => (
    <div>
        <Query query={LOCATION_QUERY} variables={{ slug: props.query.place, countryCode: props.query.country }}>
            {({ error, data, loading }) => {
                if(loading) return <p>...loading</p>
                if(error) return <Error error={error} />
                if(!data.locations[0]) return <p>Location {props.query.place} - {props.query.country} not found.</p>
                const { name, country } = data.locations[0];

                return(
                    <div>
                        <h2>{name} ({ country.name })</h2>
                        <OrderItems query={props.query} path="/location" />
                        
                        <Query query={ITEMS_IN_LOCATION_QUERY} variables={{ 
                            slug: props.query.place, 
                            countryCode: props.query.country,
                            orderBy: verifyOrderParam(props.query.orderBy),
                        }}>
                            {({ error, data, loading }) => {
                                if(loading) return <p>...loading</p>
                                if(error) return <Error error={error} />
                                if(!data.items) return <p>Something went wrong.</p>
                                if(!data.items.length) return(
                                    <>
                                        <p>No items in {name} yet.</p>
                                        <p>
                                            Maybe you have a good picture in {name}, {country.name}? <Link href="/sell"><a>add the picture</a></Link>
                                        </p>
                                    </>
                                );
                                return(
                                    <>
                                        {data.items.map(item => <Item item={item} key={item.id} /> )}
                                    </>
                                );
                            }}
                        </Query>
                    </div>
                )
            }}
        </Query>
    </div>
);

export default SingleLocation;
// export { ITEMS_IN_LOCATION_QUERY };