import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Error';
import Item from './Item';
import Title from './Title';

const RECENT_ITEMS_QUERY = gql`
    query RECENT_ITEMS_QUERY($orderBy: ItemOrderByInput = createdAt_DESC, $first: Int = 10){
        items(orderBy: $orderBy, first: $first){
            id
            image
            largeImage
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
            votes{
                id
            }
            voteCount
        }
    }
`;

const MOST_VOTED_ITEMS_QUERY = gql`
    query MOST_VOTED_ITEMS_QUERY($orderBy: ItemOrderByInput = voteCount_DESC, $first: Int = 10){
        items(orderBy: $orderBy, first: $first){
            id
            image
            largeImage
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
            votes{
                id
            }
            voteCount
        }
    }
`;

const DisplayHomeItems = props => {

    return(
        <Query query={props.query}>
            {({loading, error, data}) => {
                if(loading) return <p>...loading</p>
                if(error) return <Error error={error} />
                if(!data) return <p>Something went wrong</p>
                if(!data.items.length) return <p>No items added yet.</p>
                //console.log('data', data)
                return(
                    <div>
                        <h2>{props.title}</h2>
                        <div className="grid-items">
                            {data.items.map(item => <Item key={item.id} item={item} />)}
                        </div>
                    </div>
                )
            }}
        </Query>
    )
};

const Home = props => (
    <div>
        <Title>Home</Title>
        <DisplayHomeItems query={RECENT_ITEMS_QUERY} title="Recent Items" />
        <DisplayHomeItems query={MOST_VOTED_ITEMS_QUERY} title="Popular items" />
    </div>
)

export default Home;