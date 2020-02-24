import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY{
        items{
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

class Items extends React.Component{
    render(){
        return(
            <div>
                <Query query={ALL_ITEMS_QUERY}>
                    {({ data, error, loading }) => {
                        console.log(data);
                        if(loading) return <p>...loading</p>
                        if(error) return <p>Error: {error.message}</p>
                        return <div>
                            {data.items.map(item => <Item item={item} />)}
                        </div>
                    }}
                </Query>
            </div>
        )
    }
}
export default Items;
export { ALL_ITEMS_QUERY };