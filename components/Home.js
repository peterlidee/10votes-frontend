import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from './snippets/Loader';
import NewError from './NewError';
import Item from './Item';
import MetaTitle from './snippets/MetaTitle';

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

const DisplayHomeItems = props => (
    <section>
        <h1 className="title">{props.title}</h1>
        <Query query={props.query}>
            {({loading, error, data}) => {
                if(loading) return <Loader containerClass="items-loader" />;                
                if(error) return <NewError error={error} />
                if(!data) return <p className="no-data">Something went wrong</p>
                if(!data.items.length) return <p className="no-data">No items added yet.</p>

                return(
                    <div className="grid-items">
                        {data.items.map(item => <Item key={item.id} item={item} />)}
                    </div>
                )
            }}
        </Query>
    </section>
);

const Home = props => (
    <>
        <MetaTitle>Home</MetaTitle>
        <DisplayHomeItems query={RECENT_ITEMS_QUERY} title="Recent Items" />
        <DisplayHomeItems query={MOST_VOTED_ITEMS_QUERY} title="Popular items" />
    </>
)

export default Home;