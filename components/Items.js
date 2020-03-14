import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}){
        items(skip: $skip, first: $first){
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
                <Pagination page={this.props.page} />
                <Query 
                    query={ALL_ITEMS_QUERY}
                    //fetchPolicy="network-only"
                    variables={{ skip: this.props.page * perPage - perPage }}>
                    {({ data, error, loading }) => {
                        //console.log(data);
                        if(loading) return <p>...loading</p>
                        if(error) return <p>Error: {error.message}</p>
                        return <div>
                            {data.items.map(item => <Item item={item} key={item.id} />)}
                        </div>
                    }}
                </Query>
                <Pagination page={this.props.page} />
            </div>
        )
    }
}
export default Items;
export { ALL_ITEMS_QUERY };